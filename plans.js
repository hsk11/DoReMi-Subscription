const plansSUB = {
    music: {
        free: { price: 0, duration: 1 },
        personal: { price: 100, duration: 1 },
        premium: { price: 250, duration: 3 }
    },

    video: {
        free: { price: 0, duration: 1 },
        personal: { price: 100, duration: 1 },
        premium: { price: 500, duration: 3 }
    },
    podcast: {
        free: { price: 0, duration: 1 },
        personal: { price: 100, duration: 1 },
        premium: { price: 300, duration: 3 }
    },
}
const topUps = {
    four_devices: {
        price: 100,
        devices: 4,
        duration: 1
    },
    ten_devices: {
        price: 100,
        devices: 4,
        duration: 1
    }
}

module.exports = {
    plansSUB,
    topUps
}