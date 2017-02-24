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
        
        
        var o = {
            top: parseInt($el.css('top'))  - 40,
            left: parseInt($el.css('left')) - 40
        };
        
        $('#pepwrapper').animate({
            'scrollLeft':  o.left,
            'scrollTop':  o.top
        }, 500 );

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


    var canvas = {
        width:$article.length * 100,
        height:$article.length * 100 
    }      

    $pep.css({
        'width': canvas.width + 'px',
        'height': canvas.height + 'px'
    }) 

    var lequel = Math.floor( Math.random() * $article.length);

    var positions = {

        zoneinterdite : [],
        getX : function(){
            return Math.floor( Math.random() * (canvas.width - 400) );
        },
        getY : function(){
            return Math.floor( Math.random() * (canvas.height - 400) );
        },
        checkOverlapping : function(box1,box2){

            var x1 = box1.left
            var y1 = box2.top;
            var h1 = box1.height;
            var w1 = box1.width;
            var b1 = y1 + h1;
            var r1 = x1 + w1;
            var x2 = box1.left;
            var y2 = box1.top;
            var h2 = box1.height;
            var w2 = box1.width;
            var b2 = y2 + h2;
            var r2 = x2 + w2;

            var buf = 24;

            if (b1 + buf < y2 || y1 > b2 + buf || r1 + buf < x2 || x1 > r2 + buf) return false;
            return true;

            // for(var i = 0; i< positions.zoneinterdite.length; i++){
            //     var pos = positions.zoneinterdite[i];
            //     if ( x > pos.x && x < pos.x + pos.w ){
            //         console.log('x failed :', x, pos.x, pos.x + pos.w)
            //         return false;
            //     } 
            //     if(y > pos.y && y < pos.y + pos.h) {
            //         console.log('y failed :',y, pos.y, pos.y + pos.h)
            //         return false;
            //     } 
                
            //     return true;
                
            // }
        }
    }
    console.log($article.length, canvas)

    $article.each(function(idx){

        var $this = $(this);
        var conflict = true;
        var toomuch = 0;
        var box;
        while (conflict) {
            toomuch++;
           
            box = {
                left:positions.getX(),
                top:positions.getY(),
                width:$this.width(),
                height:parseInt($this.find('img').attr('height')) || $this.height()
            }

            // conflict = false;
            for (var i = 0; i < positions.zoneinterdite.length; i++) {
                if (positions.checkOverlapping(box, positions.zoneinterdite[i])) {
                    console.log(box, positions.zoneinterdite[i])
                    conflict = false;                 
                    // break;
                } else {
                    conflict = true;
                }
            }

            if(toomuch==20){
                $this.css('border', '10px solid red')
                break;
            }
            

        }
        positions.zoneinterdite.push(box);

        $this.css({
            'left': box.left +'px',
            'top': box.top +'px'
        })

        if(idx == lequel){
            $this.css({
                'left': Math.floor( Math.random() * bodyWidth ) +'px',
                'top': Math.floor( (bodyHeight - 40) -  Math.random() * 180 ) +'px'
            })
        } 
        

        if($this.hasClass('texte')){
            $this.pep({
                constrainTo: '#pep',       
                allowDragEventPropagation:false
            }) 
        }
        
    })

})(jQuery);