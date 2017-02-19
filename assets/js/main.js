(function($) {
    

    var imgLoaded = false,
        $body = $('body'),
        $pep = $('#pep'),
        $home = $('#home'),
        $nav = $('nav'),
        $article = $('article'),
        $slide = $('.slide');


    $pep.imagesLoaded( function() {
        imgLoaded = true;
        $('.loading').addClass('invisible');
        $('.loaded').addClass('visible');
    })
    
    var detectMouse = function(e){
        if (e.type === 'mousedown' || e.type === 'mousemove') {
            $('body').addClass('dragscroll free');
        }
        $body.off('mousedown mousemove', detectMouse);
        dragscroll.reset();
    }
    $body.on('mousedown mousemove', detectMouse);
    


    // calculate heights

    var imgHeight = 0,
        navHeight = 0, 
        calculateHeights = function(){
            navHeight = $body.outerHeight();
            imgHeight = navHeight - 80;
            $nav.height(navHeight);
            $slide.height(navHeight);
        };

    $(window).on('resize', calculateHeights);
    calculateHeights()

    var totop = function(el){
        
        var $el = $(el);

        // if has image
        var $img = $el.find('img').first();
        if($img.length){
            $next = $img.next();
                
            if ($img.hasClass('big')){
                $img.removeClass('big');
                $next.attr('src', $next.data('src'));
                $img.animate({
                    'height':$img.attr('height'),
                    'opacity':.8
                }, 350);                    
            } else {
                $img.addClass('big');
                $img.animate({
                    'height':imgHeight,
                    'opacity':1
                }, 350);   
                $next.attr('src', $img.data('source'));                
            }
        }


        // call related
        // var s = setTimeout(function () {
            
        //     var related = $el.attr('data-related').replace(/ +(?= )/g,'').split(' ');
            
        //     for (var i = 0; i < related.length; i++) {
        //         if(related[i] != ''){
        //             var $r = $( '#'+related[i] );
        //             $r.velocity({
        //                 'left':parseInt($el.css('left')) + $el.width() + 40 + Math.floor( Math.random() * 150 ),
        //                 'top':parseInt($el.css('top')) + i * 80 
        //             }, 600, 'easeOutQuad');
        //             $r.css('z-index', 100);
        //         }
        //     }
        // }, 500)
        
        var box = $el[0].getBoundingClientRect ? $el[0].getBoundingClientRect() : {top: 0, left: 0};

        var o = {
                top: box.top + (window.pageYOffset || document.scrollTop || 0) - (document.clientTop || 0),
                left: box.left + (window.pageXOffset || document.scrollLeft || 0) - (document.clientLeft || 0)
        };
        console.log(o.top)
        // $('html').animate(
        //     {
        //         'scrollLeft':  o.left,
        //         'scrollTop':  o.left
        //     },
        //     500
        // );

        // reset others
        $article.css('z-index', 0);
        $el.css('z-index', 200);

        $('img.big').not($img).each(function(){
            var $next = $(this).next();
            $next.attr('src', $next.data('src'));
            $(this).animate({
                'height':$(this).attr('height'),
                'opacity':.8
            }, 350)
            $(this).removeClass('big');
        })
        
    }

   


})(jQuery);