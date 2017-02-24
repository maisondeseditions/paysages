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
            var $this = $(this),
                pdl = Math.floor( Math.random() * 150) + 20;
            $this.data('pdl', pdl);
            $this.css({
                marginTop: Math.floor( Math.random() * 550) + 50,
                marginBottom: Math.floor( Math.random() * 150) + 50,
                paddingLeft: pdl
            })
        })


        $pep.packery({
          // options
          transitionDuration:0,
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
            
            if ($el.hasClass('big')){
                $el.removeClass('big');
                $img.attr('src', $img.data('thumb'));      
                $el.velocity({'padding-left':$el.data('pdl')}, {
                    duration: 150,
                    easing: 'ease-out'
                });

            } else {
                $el.addClass('big');
                $img.attr('src', $img.data('source'));                
            }
        }
        
        // reset other
        $('.big').not($el).each(function(){
            var $this = $(this),
                $img = $this.find('img').first();

            if($img.length){
                $img.attr('src', $img.data('thumb'));
                $this.removeClass('big');
            }
            $this.velocity({'padding-left':$this.data('pdl')}, {
                duration: 150,
                easing: 'ease-out'
            });
        })

        

        // call related
        var related = $el.attr('data-related').replace(/ +(?= )/g,'').split(' ');
        
        for (var i = 0; i < related.length; i++) {
            if(related[i] != ''){
                var $r = $( '#'+related[i] );
                $el.after($r);
            }
        }

        $pep.packery();

        var s = setTimeout(function () {
            
            $el.velocity({'padding-left':40}, {
                duration: 150,
                easing: 'ease-out'
            });
            $el.velocity('scroll', {
                duration: 500,
                offset: -40,
                easing: 'ease-out'
            });
            
        }, 500)
            



        

        
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


    

    

})(jQuery);