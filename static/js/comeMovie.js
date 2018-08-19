//显示即将上映的电影
$(function () {
    var url = 'https://api.douban.com/v2/movie/coming_soon?apikey=0b2bdeda43b5688921839c8ecb20399b'
    $.ajax({
        type: 'get',
        dataType: "jsonp",
        url: url,
        success: function (msg) {
            var movies=msg.subjects;
            var show='';
            var lz=`
            <div class="item active"><img class="imglz" src="${movies[0].images.large}" alt="First slide" ></div>
             <div class="item"><img class="imglz" src="${movies[1].images.large}" alt="Second slide" ></div>
            <div class="item"><img class="imglz" src="${movies[2].images.large}" alt="Third slide" ></div>
        `;
            $('#lz').html(lz);
            $.each(movies,function (index,item) {
                show+=`
<div class="item" style="float:left;width: 200px">
<a href="#vd" onClick="show(${item.id})">
<img  src="${item.images.large}" alt="${item.title}" style="border-radius: 50%;width: 160px;height: 180px">
</a>
<h3 style="text-align: center">${item.title}</h3>
</div>
`
            })
            // console.log(show)
            $('.row').append(show)
        }
    })
})

//显示电影详情
function show(id) {
    var url='http://api.douban.com/v2/movie/subject/'+id+'?apikey=0b2bdeda43b5688921839c8ecb20399b&city=北京&client=&udid='
    $.ajax({
        type: 'get',
        url: url,
        dataType: "jsonp",
        success:function (msg) {
            console.log(msg)
            var mv=`<img class="featurette-image img-responsive center-block" src="${msg.images.small}" style="align:left"><div><h6 class="featurette-heading">${msg.title}</h6></div><br>
<div><b>影片简介： </b>${msg.summary}</div>`
            $('.row-featurette').html(mv);

            var vd=`<video src="${msg.clip_urls}" controls preload>您的浏览器不支持video标签</video>`

            console.log(mv)
            var show='';
            var actors=msg.casts;
            // console.log(actors[0].name)
            $.each(actors,function(index,item){
                show+='<span>'+item.name+'  </span>'
            })
            $('.row-featurette').append(show);


            $('#vd').html(vd);

            //显示热门评论
            var pc=msg.popular_comments;
            var pcshow='';
            $.each(pc,function (index,item) {
                pcshow+=`
                 <img src="${item.author.avatar}" alt="${item.author.signature}" style="align:left;display: inline-block">
                 <p style="display: inline-block">${item.content}</p>
                    <hr>
                 `
            })
            $('#pc').append(pcshow);
        }
    })
}
//回到顶部
$(function(){

    $('#goToTop').hide();        //隐藏go to top按钮

    $(window).scroll(function(){
        // console.log($(this).scrollTop());

        //当window的scrolltop距离大于1时，go to
        if($(this).scrollTop() > 100){
            $('#goToTop').fadeIn();
        }else{
            $('#goToTop').fadeOut();
        }
    });

    $('#goToTop a').click(function(){
        $('html ,body').animate({scrollTop: 0}, 300);
        return false;
    });
});