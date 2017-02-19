(function($) {
    

    var imgLoaded = false,
        $body = $('body'),
        $pep = $('#pep'),
        $home = $('#home'),
        $nav = $('nav'),
        $article = $('article');


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
    


    var imgHeight = $('body').height() - 80;
    $( window ).resize(function() {
        imgHeight = $('body').height() - 80;
    });

    var totop = function(el){
        
        var $el = $(el);

        // reset others
        $article.css('z-index', 0)
        $('img').not($img).each(function(){
            $(this).velocity({
                'height':$(this).attr('height'),
                'opacity':.8
            }, 350, 'easeOutQuad')
        })
        
        $el.css('z-index', 200)    

        // if has image
        var $img = $el.find('img').first();
        if($img.length){
            if ($img.hasClass('big')){
                $img.removeClass('big');
                $img.velocity({
                    'height':$img.attr('height'),
                    'opacity':.8
                }, 350, 'easeOutQuad');    
                $el.children().last().remove() 
            } else {
                $img.addClass('big');
                $img.velocity({
                    'height':imgHeight,
                    'opacity':1
                }, 350, 'easeOutQuad');   
                $el.append($('<img src="' + $img.data('source') + '">')) 
            }

            
        }


        // call related
        var s = setTimeout(function () {
            
            var related = $el.attr('data-related').replace(/ +(?= )/g,'').split(' ');
            
            for (var i = 0; i < related.length; i++) {
                if(related[i] != ''){
                    var $r = $( '#'+related[i] );
                    $r.velocity({
                        'left':parseInt($el.css('left')) + $el.width() + 40 + Math.floor( Math.random() * 150 ),
                        'top':parseInt($el.css('top')) + i * 80 
                    }, 600, 'easeOutQuad');
                    $r.css('z-index', 100);
                }
            }
        }, 500)
        
        $el.velocity('scroll', {
            duration: 500,
            axis:'x',
            offset: -40,
            easing: 'ease-in-out'
        });
        $el.velocity('scroll', {
            duration: 500,
            axis:'y',
            offset: -40,
            easing: 'ease-in-out'
        });
        
    }

    $home.on('tap click', function() {
        if(imgLoaded){
            $home.addClass('invisible');
            setTimeout(function(){
                $home.css('z-index',-1)
            }, 250)
            setTimeout(function() {                
                $('.pep').addClass('visible');
                // $('html').velocity('scroll', {
                //     duration: 500,
                //      offset: "450px",
                //     easing: 'easeOutCubic'
                // });
                
            }, 500)
        }
    });

    $(".hamburger").click(function(){
        $nav.toggleClass("is-active");
        $nav.removeClass("is-slided");
        $('.slide').removeClass("visible");

        $body.toggleClass('locked');
    });
    $('.menu').on('click', 'a.slideto', function(e){
        e.stopPropagation();
        e.preventDefault();
        $target= $( $(this).attr('href'));
        $target.addClass('visible');
        $nav.toggleClass("is-slided");
    })

    $nav.on('click', function(){
        if($nav.hasClass('is-slided')){        
            $('.slide').removeClass('visible');
            $nav.toggleClass("is-slided");
        }
    })

    $article.on('tap click', function(e) {
        totop(this);
    })


    var canvas = {
        width:$article.length * 80,
        height:$article.length * 80 
    }      

    
    $pep.css({
        'width': canvas.width + $('body').width() + 'px',
        'height': canvas.height + 'px'
    }) 

   
    $article.each(function(){
        var $this = $(this);
        $this.pep({
            constrainTo: '#pep',       
            easing:false,
            allowDragEventPropagation:false
        }) 
        if (!$this.hasClass('related')) {
            $this.css({
                'left': Math.floor( Math.random() * (canvas.width  - $this.width()) ) +'px',
                'top': Math.floor( Math.random() * (canvas.height  - $this.height()) ) +'px'
            })
        }
    })


})(jQuery);