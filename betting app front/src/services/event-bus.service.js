export const eventBusService =
    createEventEmitter()

function createEventEmitter() {
    const listenersMap = {}

    return {
        on(evName, listener) {
            listenersMap[evName] = (listenersMap[evName]) ? [...listenersMap[evName], listener] : [listener]
            return () => {
                listenersMap[evName] = listenersMap[evName].filter(func => func !== listener)
            }
        },

        emit(evName, data) {
            if (!listenersMap[evName]) return
            listenersMap[evName].forEach(listener => listener(data))
        }
    }
}

//For debug only
window.ebs = eventBusService

window.showSuccessMsg = showSuccessMsg
window.showErrorMsg = showErrorMsg

export function showUserMsg(msg) {
    eventBusService.emit('show-user-msg', msg)
}

export function showSuccessMsg(txt) {
    showUserMsg({ txt, type: 'success' })
}

export function showErrorMsg(txt) {
    showUserMsg({ txt, type: 'error' })
}
