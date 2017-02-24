(function($) {
    

    var imgLoaded = false,
        $body = $('body'),
        $pep = $('#pep'),
        $home = $('#home'),
        $nav = $('nav'),
        $article = $('article'),
        $header = $('#header'),
        $slide = $('.slide');


    $pep.imagesLoaded( function() {
        var ul = document.querySelector('#pep');
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);        
        }

        $article.each(function(){
            var $this = $(this);
            $this.css({
                marginTop: Math.floor( Math.random() * 550) + 50,
                marginBottom: Math.floor( Math.random() * 150) + 50,
                marginLeft: Math.floor( Math.random() * 150) + 20
            })
        })


        $pep.packery({
          // options
          itemSelector: 'article',
          gutter: 10
        });


        imgLoaded = true;
        $('.loading').addClass('invisible');
        $('.loaded').addClass('visible');
    })
    
    var detectMouse = function(e){
        if (e.type === 'mousedown' || e.type === 'mousemove') {
            $('#pepwrapper').addClass('dragscroll free');
        }
        $body.off('mousedown mousemove', detectMouse);
        dragscroll.reset();
    }
    $body.on('mousedown mousemove', detectMouse);
    


    // calculate heights

    var imgHeight = 0,
        bodyHeight = 0, 
        bodyWidth = 0, 
        calculateHeights = function(){
            bodyHeight = $(window).outerHeight();
            bodyWidth = $(window).outerWidth();
            imgHeight = bodyHeight - 80;
            $nav.height(bodyHeight);
            $home.height(bodyHeight);
            $home.width(bodyWidth);
            $header.height(bodyHeight);
            $header.width(bodyWidth);
            $slide.height(bodyHeight);
            $('#mystyle').remove();
            var mystyle = '<style id="mystyle" type="text/css">';
            mystyle += '#header { width:' + bodyWidth + 'px; left:' + bodyWidth + 'px; } ';
            mystyle += '#header.is-active { left:' + bodyWidth / 2 + 'px; } ';
            mystyle += '#header.is-slided { left:' + bodyWidth / 10 + 'px; }';
            mystyle += '</style>';
            $('head').append(mystyle);
        };

    $(window).on('resize', calculateHeights);
    calculateHeights()

    var totop = function(el){
        
        var $el = $(el);

        // if has image
        var $img = $el.find('img').first();

        if($img.length){
            $next = $img.next();
                
            if ($el.hasClass('big')){
                $el.removeClass('big');
                $next.attr('src', $next.data('src'));
                // $img.animate({
                //     'height':$img.attr('height'),
                //     'opacity':.8
                // }, 350);                    
            } else {
                $el.addClass('big');
                // $img.animate({
                //     'height':imgHeight,
                //     'opacity':1
                // }, 350);   
                $next.attr('src', $img.data('source'));                
            }
        }

        

        // call related
        var s = setTimeout(function () {
            
            var related = $el.attr('data-related').replace(/ +(?= )/g,'').split(' ');
            
            for (var i = 0; i < related.length; i++) {
                if(related[i] != ''){
                    var $r = $( '#'+related[i] );
                    $el.after($r);
                    // $r.velocity({
                    //     'left':parseInt($el.css('left')) + $el.width() + 40 + Math.floor( Math.random() * 150 ),
                    //     'top':parseInt($el.css('top')) + i * 80 
                    // }, 600, 'easeOutQuad');
                    // $r.css('z-index', 100);
                }
            }
            $pep.packery({
                transitionDuration:0
            });


        }, 500)
        
        
        // var o = {
        //     top: parseInt($el.css('top'))  - 40,
        //     left: parseInt($el.css('left')) - 40
        // };
        
        // $('#pepwrapper').animate({
        //     'scrollLeft':  o.left,
        //     'scrollTop':  o.top
        // }, 500 );

        // reset others

        $('.big').not($el).each(function(){
            var $next = $(this).find('nth-child(2)');
            $next.attr('src', $next.data('src'));
            
            $(this).removeClass('big');
        })

        
    }

    $home.on('click', function() {
        if(imgLoaded){
            $home.addClass('invisible');
            setTimeout(function(){
                $home.css('z-index',-1)
            }, 300)
            setTimeout(function() {                
                $('.pep').addClass('visible');
                
            }, 500)
        }
    });

    $(".hamburger").click(function(){
        $header.toggleClass("is-active");
        $header.removeClass("is-slided");
        $slide.removeClass("visible");
        $body.toggleClass('locked');
    });

    $('.menu').on('click', 'a.slideto', function(e){
        e.stopPropagation();
        e.preventDefault();
        $target= $( $(this).attr('href'));
        $target.addClass('visible');
        $header.toggleClass("is-slided");
    })

    $('.menu').on('click', 'a.showurl', function(e){
        e.stopPropagation();
        e.preventDefault();
        var _url= $(this).attr('href');
        $target= $( $(this).data('target'));
        $iframe = $('<iframe src="' + _url + '" frameborder="0"></iframe>');
        $target.html($iframe);
        $target.addClass('visible url-visible');
        $header.toggleClass("is-slided url-slided");
    })

    $nav.on('click', function(){
        if($header.hasClass('is-slided')){  
            $('iframe').remove();
            $slide.removeClass('visible url-visible');
            $header.removeClass("is-slided url-slided");
        }
    })

    $pep.on('click', 'article', function(e) {
        e.stopPropagation();
        totop(this);
    })

    // var ul = document.querySelector("#pep"), // get the list
    // temp = ul.cloneNode(true); // clone the list

    // // shuffle the cloned list (better performance)
    // for (var i = temp.children.length + 1; i--; )
    //     temp.appendChild( temp.children[Math.random() * i |0] );

    // ul.parentNode.replaceChild(temp, ul); // copy shuffled back to 'ul'






    

    

    

})(jQuery);