import event from 'events'

export const eventHandler = new event.EventEmitter()

eventHandler.setMaxListeners(17)

const hookID = "Products"

const events = {
    'MAIN_STATE_UPDATE': 'UPDATE',
    'PRODUCTS_UPDATE': 'PRODUCTS UPDATE',
    'CATEGORIES_UPDATE': 'EXISTING CATEGORIES UPDATE',
    'CATEGORY_UPDATE': 'CATEGORY UPDATE',
    'CURRENT_CATEGORY_UPDATE': 'CURRENT CATEGORY UPDATE'
}

const attachID = () => {
    for (var prop in events) {
        events[prop] = hookID + events[prop]
    }
    return events
}

export const keys = attachID()