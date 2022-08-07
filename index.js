var res;
$('#url').on('input',function() {
    u = $("#url").val();
    if(u == "")
    {
        document.getElementById("result").innerHTML="";
        document.getElementById("err").innerHTML="";
    }
    else if(validURL(u))
    {
        document.getElementById("err").innerHTML="";
        httpGet(u);
    }
    else
    {
        document.getElementById("err").innerHTML='<div class="text-danger text-center">Invalid URL! Enter a valid URL.</div>';
        document.getElementById("result").innerHTML="";
    }
});

function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

function httpGet(theUrl)
{
    $.ajax({
        url: "https://api.linkpreview.net",
        dataType: 'jsonp',
        data: {q: theUrl, key: '153ff2b028ab5304854c8759fcfd8908'},
        success: function (data) {
            res = data;
            if(!('error' in res))
            {
                if(res['title']=="")
                res['title'] = theUrl
                if(res['image']=="")
                res['image'] = 'https://w7.pngwing.com/pngs/136/286/png-transparent-blue-and-black-www-logo-computer-icons-website-favicon-world-wide-web-www-site-internet-icon-miscellaneous-label-text.png';

                document.getElementById("result").innerHTML=`<div class="card w-50">
                <img class="p-5 w-50"
                    src="`+res['image']+`"
                    class="card-img-top" alt="favicon/ico">
                <hr>
                <div class="card-body">
                    <a style="text-decoration:none" href="`+res['url']+`"><h4 class="card-title">`+res['title']+`</h4></a>
                    <p class="card-text">`+res['description']+`</p>
                    <a href="`+res['url']+`"><p class="card-text text-secondary">`+res['url']+`</p></a>
                </div>
            </div>`;
            }
            else
            {
                document.getElementById("result").innerHTML='<div class="text-danger text-center">'+res['description']+': Error '+res['error']+'</div>'
            }
        },
    });
    
}