# Changelog

All notable changes to this project will be documented here. :)

## MITM 0.0.4
Released on Dec. 14, 2017

### Added
* Invoke `chrome.browsingData.removeCache` method
    + ensure user always get the latest resource when changing the extension status
    + avoid bug like the one introduced in v0.0.3 while user might change status in non-targeted tab page

### Removed
* Automatically reload page when change extension enable/disable status.
* Remove mandatory check as `storage.onChanged` event is enough when status changed.

## MITM 0.0.3
Released on Nov. 30, 2017

### Added
* Automatically reload page when change extension enable/disable status. (Removed in v0.0.4)

## MITM 0.0.2
Implement core functionality. Released on Nov. 30, 2017

### Added
* Implement basic resource file replace functionality. (Only support *.js currently)
* Use popup dialog to enable/disable extension.

## MITM 0.0.1
Released on Nov. 25, 2017

#### Added
* Create this project and build the basic structure
* Add a small icon.png for this project