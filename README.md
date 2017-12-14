# MITM

MITM aka Man-In-The-Middle, means this is kind of interception Chrome Extension when using.

### How To Use ( Ver <= 0.0.4)

For this extension, you need download the whole project and add some extra info to make it work. Below is the step you need to take.

##### Set the URL you want to take effect
* Open `manifest.json`
* Update the URL part in "permissions"

##### Modify Regulation rule for extension to use
* Open `background.js`
* Update the variable `re` to populate your desired regexp

##### Add the replace reource code into replace.js (Now only support *.js)
* Open `replace.js`
* Write/Paste the code you already did in it
* Don't forget to save the file. :)


### TODO list
I have added several TODO comments in the code and most of them should be able to implemented in the coming future releases. Stay tuned!

* Make `re` rule configurable in popup html
* Make `replace.js` content configurable in popup html or else place instead of packing extension by user himself.
* Support personalized notifications.
* (Supported in v0.0.3) ~~Support automatically reload page when enable/disable extension.~~