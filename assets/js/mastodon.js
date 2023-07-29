// cSpell:ignore dataprompt

/* This Javascript code generates a pop-up window that asks for the Mastodon instance
 * to which the page should be shared.
 * In contrast to other social media channels, one can only be logged in on their own instance and 
 * post on that instance.
 * After the information is entered in the pop-up and "OK" is clicked. A new window is opened to the Mastodon
 * instance and will create a post if the user is logged in 
 * it requires the following additional information to be added into params.toml:
 * [[sharing.providers]]
 *  name = "Mastodon"
 *   url = "#"
 *   icon = "fab mastodon"
 *   id = "mastodon"
 *   source = "share?text={title}&url={url}"
 *   prompt = "mastodon"        # This is the id, which will be looked for in the language file to get the text
 *   weight = 50
 */

 // Wait for the page to have loaded, then call this function
 window.onload = function() {

    // Get a reference to the Mastodon button
    var mastodon = document.getElementById("mastodon");
    if (mastodon == null) {
        return false;
    }

    // Set code to run when the button is clicked by assigning a function to "onclick"

    mastodon.onclick = function() {

        // Get the ID again of the Mastodon button
        var id = document.getElementById("mastodon");

        if (id == null)
        {
            // That didn't work
            return false;
        }

        // Get the information to send to the mastodon instance
        var data = id.getAttribute("data-m-src");

        if (data == null){
            // There is no data source, so just exit
            return false;
        }

        // Check if we have a data-prompt, which shows what prompt to show to the user
        var dataprompt = id.getAttribute("data-m-prompt");

        if (dataprompt == null)
        {
            // No prompt, use default
            dataprompt = "Enter your Mastodon domain where to make the post:" 
        }


        // Ask for the Mastodon instance
        domain = prompt(dataprompt, "mastodon.social");

        if (domain == null || domain == ""){
            // It was canceled or empty, so forget it
            return false;
        }
    
        // Create the URL. The resulting link should be something like this:
        //   https://techhub.social/share?text=TheTitleOfThePage&url=URLtoPage
        var url = "https://" + domain + "/" + data;

        // Open a new window for Mastodon
        window.open(url, '_blank');

        return false;
    }
  }


