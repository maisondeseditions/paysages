(function($) {
    

    var imgLoaded = false,
        packedpep = null,
        $window = $(window),
        $body = $('body'),
        $pep = $('#pep'),
        $home = $('#home'),
        $nav = $('#nav'),
        $article = $('.item'),
        $header = $('#header'),
        $slide = $('.slide'),
        $clonezone = $('#clonezone'),
        $relzone = $('#relzone'); 



    /* ------------------------------------------------- Init positions
    ---------------------------------------------------- */

    $pep.imagesLoaded( function() {

        imgLoaded = true;


        var ul = $pep[0];
        for (var i = ul.children.length; i >= 0; i--) {
            ul.appendChild(ul.children[Math.random() * i | 0]);        
        }

        $article.each(function(){
            var $this = $(this),
                pdl = Math.floor( Math.random() * 150) + 20;
            $this.attr('data-pdl', pdl);
            $this.css({
                paddingTop: Math.floor( Math.random() * 550) + 50,
                marginBottom: Math.floor( Math.random() * 150) + 50,
                paddingLeft: pdl
            })
        })
        
        $pep.packery({
            transitionDuration:0,
            itemSelector: '.item',
            gutter: 10,
            isInitLayout: false
        }).packery( 'on', 'layoutComplete', function() {
            $article.each(function(){
                $(this).attr('data-left', parseInt( $(this).css('left') ))
            })  
        })

        $pep.packery()
        
        $('.loading').addClass('invisible');
        $('.loaded').addClass('visible');
    })


    /* ------------------------------------------------- Calculate heights
    ---------------------------------------------------- */

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
            $pep.width(bodyWidth - 80);
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




    /* ------------------------------------------------- Zoom out
    ---------------------------------------------------- */
    var zoomout = function(){

        
        var $el = $clonezone.find('> article');
        $article.removeClass('hidden');
        $relzone.empty();
        $relzone.removeClass('visible');
        
        $el.velocity({
            // 'padding-left':$el.data('pdl'), 
            // 'left':$el.data('left')
            opacity:0
        }, {
            duration: 150,
            easing: 'ease-out',
            complete: function(elements) { 
                setTimeout(function(){
                    $el.addClass('out');
                    $body.removeClass('locked');
                    $pep.removeClass('related');
                }, 150)
            }

        });


        var s = setTimeout(function(){
            $el.remove();
        }, 300)
    }

    /* ------------------------------------------------- Zoom in
    ---------------------------------------------------- */

    var zoomin = function(el){
        
        var $el = $(el);
        
        $relzone.empty();
        $pep.addClass('related');
        $body.addClass('locked');
        $article.removeClass('hidden');
        
        $clone = $el.clone();
        $clone.attr('id', $el.attr('id') + 'clone')
        $clone.addClass('clone');
        $clonezone.append($clone);
        
        $el.addClass('hidden');
        
        var top = parseInt($clone.css('top') ) + parseInt($clone.css('padding-top') );
        $clone.css({
            'top': top,
            'padding-top':0,
        })
        $clone.addClass('big');


        $('html, body').animate({
            'scrollTop':  top - 40
        }, 500 );

        $clone.css({
            'padding-left':40, 
            'left':0
        })
        
        
        // if has image
        var $img = $clone.find('img').first();
        if($img.length){
            var img = new Image(),
                img_src = $img.data('source');

            img.onload = function(){
              $img.attr('src', img_src);                   
              console.log('loaded')
            };
            img.src = img_src;

            
        }
    
        

        // // call related

        
        
        // var related = $el.attr('data-related').replace(/ +(?= )/g,'').split(' ');

        // occupied_space = $clone.find('img').width() + 80 || 480;
        // available_space = $window.width() - 80 - occupied_space;
        
        // $relzone.css({
        //     'width':available_space,
        //     'left': occupied_space
        // })
        // $clone.after($relzone);


        // for (var i = 0; i < related.length; i++) {
        //     if(related[i] != ''){
        //         var $rel = $( '#'+related[i] );
        //         var $r = $rel.clone();
                
        //         $relzone.append($r);
        //         $r.css({
        //             'position':'static',
        //             'margin':'0 0 40px 0',
        //             'padding':0
        //         })
        //     }
        // }

        // var s = setTimeout(function () {
        //     $relzone.addClass('visible');
        // }, 1500)
   
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
        $target = $( $(this).attr('href'));
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
        zoomin(this);
    })

    $clonezone.on('click', 'article', function(e) {
        e.stopPropagation();
        zoomout();
    })


    

    

})(jQuery);