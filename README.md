# Youtube Looper Browser Console Plugin

This is a browser console script that generate a input box under the video title. You can insert a timestamp, eg `1:00:11`, to directly skip to the that timestamp.

It also allows looping between timestamps, eg `0:11:00 - 0:12:00`, when youtube player head hit `0:12:00`, it will go back to `0:11:00` to replay again until you hit the stop button.

When pressing the `Q` button, the plugin will copy the current playhead timestamp to the computer clipboard

## Usage

1. Open the browser console
2. Copy this `youtube-player-timestamp-display-console-plugin.js` code and paste it inside the console
3. Enjoy this plugin

> ### Additional notes:
>
> If you never paste any code inside the console, the browser will give you the following warning:
>
> `Warning: Don’t paste code into the DevTools Console that you don’t understand or haven’t reviewed yourself. This could allow attackers to steal your identity or take control of your computer. Please type ‘allow pasting’ below and hit Enter to allow pasting.`
>
> To paste it, you must first manually type `‘allow pasting’` then press `enter`.

> But due to browser constrain, whenever the Youtube website is refreshed, this script must be pasted again into the console.

## Shortcut Keys

-   `Q`: Copy the current playhead timestamp to clipboard

-   `W`: Move focus the this plugin input field that inserted into the DOM. You can insert timestamp here.

-   `E`: Clear the input field

-   `Esc`: Unfocus the input field

After inserting the timestamp in the input field under the YouTube video title, you can press `enter` to confirm the timestamp.

## Privacy

This console plugin will not collect any information or connecting to any server.

## Tested Browser

This script works in various of browser, including Safari, Chrome, Firefox, and Microsoft Edge.
