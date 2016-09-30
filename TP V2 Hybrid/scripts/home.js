function loadSite(n){
        var loc = "http://www.imdb.com/";
        if(n == 1) 
            {
              loc = "http://jquery.com/";  
            }
        
        //var loc = "";
        document.getElementById('myFrame').setAttribute('src', loc);
    }