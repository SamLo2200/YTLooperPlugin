# Youtube Looper Browser Console Plugin

This is a browser console script that generate a input box under the video title. You can insert a timestamp, eg `1:00:11`, to directly skip to the that timestamp.

It also allows looping between timestamps, eg `0:11:00 - 0:12:00`, when youtube player head hit `0:12:00`, it will go back to `0:11:00` to replay again until you hit the stop button.

You can also have multiple pairs of timestamps by separating each pair by a comma to loop in order as a playlist, eg `0:01:00 - 0:01:12, 0:05:32 - 0:05:35`.

When pressing the `Q` button, the plugin will copy the current playhead timestamp to the computer clipboard

## Usage

1. Open the browser console
2. Copy this `youtube-player-timestamp-display-console-plugin.js` code and paste it inside the console
3. Enjoy this plugin

### Additional notes:

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

This console plugin will not collect any information or connect to any server.

## Tested Browser

This script works in various browsers, including Safari, Chrome, Firefox, and Microsoft Edge.
***
# Youtube Looper 瀏覽器控制台插件

這是一個瀏覽器控制台腳本，可以在視頻標題下生成一個輸入框。您可以插入一個時間戳，例如 `1:00:11`，直接跳轉到該時間點。

它還允許在時間戳之間循環播放，例如 `0:11:00 - 0:12:00`，當 YouTube 播放器達到 `0:12:00` 時，它會返回到 `0:11:00` 重新播放，直到您按下Stop。

您還可以通過用逗號分隔每對時間戳來創建多個時間戳對，以按順序循環播放作為播放列表，例如 `0:01:00 - 0:01:12, 0:05:32 - 0:05:35`。

按下 `Q` 鍵時，插件將將當前播放頭的時間戳複製到計算機的剪貼板中。

## 用法

1. 打開瀏覽器控制台
2. 將此 `youtube-player-timestamp-display-console-plugin.js` 代碼複製並粘貼到控制台內
3. 享受這個插件

### 附加說明：

> 如果您從未在控制台中粘貼任何代碼，瀏覽器將給您以下警告：
>
> `警告：不要將您不了解或未經審查的代碼粘貼到開發者工具控制台中。這可能允許攻擊者竊取您的身份或控制您的計算機。請在下方輸入“允許粘貼”並按 Enter 以允許粘貼。`
>
> 若要進行粘貼，您必須手動輸入“允許粘貼”，然後按下 `enter`。

> 但由於瀏覽器限制，每當刷新 YouTube 網站時，此腳本必須再次粘貼到控制台中。

## 快捷鍵

-   `Q`：將當前播放頭的時間戳複製到剪貼板

-   `W`：移動焦點到此插件插入到 DOM 中的輸入字段。您可以在這裡插入時間戳。

-   `E`：清除輸入字段中的內容

-   `Esc`：取消焦點於輸入字段

把時間戳插入到YouTube視頻標題下的輸入框後，按下 `Enter` 鍵以確認時間戳。
## 隱私

此控制台插件不會收集任何信息或連接到任何服務器。

## 測試過的瀏覽器

此腳本在各種瀏覽器中均可運行，包括 Safari、Chrome、Firefox 和 Microsoft Edge.