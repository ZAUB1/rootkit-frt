# Overlays

## Notification
Notifications shows up in the right up corner of the brower screen for 3 seconds

### Invoking
```javascript
const notif = Notification.create();
// Setting notification body
notif.setVar("body", `Test click handler !! (Comp ID: ${_this.DOMElem.id})`);
notif.render();
```