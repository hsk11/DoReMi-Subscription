const { customConsole } = require('./helpers');
const { plansSUB, topUps } = require('./plans');
const nextDate = (months, date) => {
    var now = date || new Date();
    return new Date(now.getFullYear(), now.getMonth() + months, now.getDate() + 1);
}

const getToken = () => {
    return (Math.random() + 1).toString(34).substring(2)
}
const daysDiff = (date1, date2) => {
    
const diffTime = date2 - date1
const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
return diffDays;
}
const renewalAmount = (user) => {
    let total = 0;
    let noOfSubscriptions = 0;
    Object.keys(user.subscription).forEach(key => {
       
        const sub = user.subscription[key];
        if (sub.status === 'active') {
            noOfSubscriptions++
            total += sub.plan !== 'free'?plansSUB[key][sub.plan].price:plansSUB[key]['personal'].price;
        }
    });
    if (total > 0 && user.topUp.status === 'active') {
        total += topUps[user.topUp.plan].price;

    }

    return total +` INR  for ${noOfSubscriptions} active subscription/s and ${user.topUp.status === 'active'?1:0} active top up`;
}
const users = {
    data: [],
    currentUser: null,
    create: function (email, password) {
        const token = getToken();
        const userExist = this.data.find(user => user.email === email)
        if (userExist) {
            customConsole({ 'User already exist': 'Please use another email' });
            return;
        }
        this.data.push({ email, password, token, subscription: {}, topUp: {} });
        customConsole({ 'User Created': 'Successfully', 'Token': token, email });
    },
    delete: function (token) {
        let index;
        this.data.find((user, i) => {

            if (user.token === token) {
                index = i;
                return true;
            }
            return false;
        })
        if (index !== undefined) {
            customConsole({ 'User Deleted': 'Successfully' });
        }
        else {
            customConsole({ 'ERROR': 'User not found' })
        }
    },
    login: function (email, password) {
        let index;
        this.data.find((user, i) => {

            if (user.password === password && user.email === email) {
                index = i;
                return true;
            }
            return false;
        })
        if (index !== undefined) {
            this.currentUser = this.data[index];
            customConsole({ 'User Logged in': ' Successfully', Token: this.data[index].token, email });

        }
        else {
            customConsole({ 'ERROR': 'Invalid Credentials' })
        }
    },
    get: function (token) {
        if (this.currentUser) {
            customConsole({ 'User': this.currentUser })
            return this.currentUser;
        }
        let index;
        this.data.find((user, i) => {

            if (user.token === token) {
                index = i;
                return true;
            }
            return false;
        })
        if (index !== undefined) {
            customConsole({ 'User Logged in': ' Successfully', ...this.data[index] });
        }
        else {
            customConsole({ 'ERROR': 'Invalid Credentials' })
        }

    },

    addSUB: function (type, plan) {

        if (!this.currentUser) {
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        // inVALID PLAN
        if (!plansSUB[type] || !plansSUB[type][plan]) {
            customConsole({ 'ERROR': 'Invalid plan' })
            return;
        }


        let userPlan = this.currentUser.subscription[type];

        if (userPlan && plan === 'free' && userPlan.freeTrialUsed === true) {
            customConsole({ 'ERROR': 'Free trial already used for: ' + type })
            return;
        }

        // NO PLAN
        if (!userPlan) {
            userPlan = this.currentUser.subscription[type] = {};

            if (plan === 'free') {
                userPlan.freeTrialUsed = true;
                userPlan.freeTrialExpiryDate = nextDate(plansSUB[type][plan].duration);
            }
            userPlan.plan = plan;
            userPlan.startDate = new Date();
            userPlan.duration = plansSUB[type][plan].duration;
            userPlan.status = 'active';
            userPlan.expiryDate = nextDate(plansSUB[type][plan].duration);
        }
        // PLAN EXIST
        else {
            if (userPlan.expiryDate > new Date() && userPlan.plan !== plan) {
                customConsole({ 'ERROR': 'You already have a plan' })
                return;
            }


            userPlan.plan = plan;
            userPlan.duration = plansSUB[type][plan].duration;
            if (userPlan.expiryDate > new Date()) {

                userPlan.expiryDate = nextDate(plansSUB[type][plan].duration, userPlan.expiryDate);
            }
            else {
                userPlan.expiryDate = nextDate(plansSUB[type][plan].duration);
            }
            userPlan.status = 'active';
        }


        const { email, password, token, ...printAble } = this.currentUser
        customConsole({
            'Subscription Added': 'Successfully',
            details: printAble
        });
    },
    getSUB: function (type) {
        if (!this.currentUser) {
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        if (!plansSUB[type]) {
            customConsole({ 'ERROR': 'Invalid plan' })
            return;
        }
        // update expiry date
        const subscription = this.currentUser.subscription[type];
        if (subscription.expiryDate < new Date()) {
            subscription.status = 'expired';
        }
        const devices=1
        if(this.currentUser.topUp.status === 'active' && this.currentUser.topUp.expiryDate < new Date()){
            devices= this.currentUser.topUp.devices;
        }
        customConsole({ [`${type} - Subscription`]: 'Details', [type]:subscription ,devices, RENEW: renewalAmount(this.currentUser)});
        return subscription;
    },

    getAllSUB: function () {

        if (!this.currentUser) {
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        // update expiry date
        const subscription = this.currentUser.subscription;
        Object.keys(subscription).forEach(type => {
            if (subscription[type].expiryDate < new Date()) {
                subscription[type].status = 'expired';
            }
            return subscription[type].status === 'active'
        });
        const devices=1
        if(this.currentUser.topUp.status === 'active' && this.currentUser.topUp.expiryDate < new Date()){
            devices= this.currentUser.topUp.devices;
        }
        customConsole({ 'Subscription': 'Details', devices, subscription, RENEW: renewalAmount(this.currentUser) });
        return subscription;

    },
    cancelSUB: function (type) {
        if(!this.currentUser){
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        if (!plansSUB[type]) {
            customConsole({ 'ERROR': 'Invalid plan' })
            return;
        }

        const subscription = this.currentUser.subscription[type];
        if (!subscription) {
            customConsole({ 'ERROR': 'No subscription found' })
            return;
        }
        if (subscription.status === 'expired') {
            customConsole({ 'ERROR': 'Subscription already expired' })
            return;
        }

        subscription.status = 'cancelled';
        customConsole({ 'Subscription': 'Cancelled', subscription:subscription });
    },
    remindersSUB:function(){
        const noOfDaysBeforeExpiry = 10;
        if(!this.currentUser){
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        const subscription = this.currentUser.subscription;
        if (!subscription) {
            customConsole({ 'ERROR': 'No subscription found' })
            return;
        }
        Object.keys(subscription).forEach(type => {
            if (daysDiff(subscription[type].expiryDate, new Date())<=10 && subscription[type].status === 'active') {
                const dateR= new Date(subscription[type].expiryDate);
                dateR.setDate(dateR.getDate() - noOfDaysBeforeExpiry);
                customConsole({ [type]: {
                    'Subscription': 'Expiring',
                    "Expiry Date": subscription[type].expiryDate,
                 
                    "Reminder": "10 days before expiry",
                    "Reminder Date": dateR
                    
            }});
            }
            customConsole({"Total Renewal Amount": renewalAmount(this.currentUser)})
            return subscription[type].status === 'active'
        })
    },
    addTopUpSUB: function (plan) {

        if (!this.currentUser) {
            customConsole({ 'ERROR': 'User not logged in' })
            return;
        }
        if (!(plan in topUps)) {
            customConsole({ 'ERROR': 'Invalid plan' })
            return;
        }
        // NO PLAN SUBSCRIPTION
        const subscription = this.currentUser.subscription;

        const hasAnyPlan = Object.keys(subscription).find(type => {
            if (subscription[type].expiryDate < new Date()) {
                subscription[type].status = 'expired';
            }
            return subscription[type].status === 'active'
        });
        if (!hasAnyPlan) {
            customConsole({ 'ERROR': 'You need to have a subscription to top up' })
            return;
        }
        const userTopUp = this.currentUser.topUp;
        // NO PLAN
        if (userTopUp.startDate === undefined) {
            userTopUp.startDate = new Date();

            userTopUp.status = 'active';
            userTopUp.expiryDate = nextDate(topUps[plan].duration);
            userTopUp.plan = plan;
        }
        // PLAN EXIST
        else {
            // In different PLan
            if (userTopUp.expiryDate > new Date() && userTopUp.plan !== plan) {
                customConsole({ 'ERROR': 'You already have a plan' })
                return;

            }
            // Previous plan is still active
            userTopUp.plan = plan;
            if (userTopUp.expiryDate > new Date()) {
                userTopUp.expiryDate = nextDate(topUps[plan].duration, userTopUp.expiryDate);
            }
            // Previous plan is expired
            else {
                userTopUp.expiryDate = nextDate(topUps[plan].duration, userTopUp.expiryDate);
            }

        }
        
        const { email, password, token, ...printAble } = this.currentUser
        customConsole({
            'Topup Added': 'Successfully',
            details: printAble
        });

    }
}


module.exports = { user: users };