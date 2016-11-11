$(function () {
    const cirColorBg = '#9e87ce';
    const cirColorReset = '#fbfcfd';
    var cirlColor = cirColorBg;

    var $main = $('main');
    var $cvs = $('#cvs');
    var cvs = $cvs[0];
    var ctx = cvs.getContext('2d');

    indexLoad();


    $('.cd-nav-trigger').on('click', function (event) {
        event.preventDefault();
        toggleNav(true);
    });

    $('.cd-close-nav, .cd-overlay').on('click', function (event) {
        event.preventDefault();
        toggleNav(false);
    });

    $('.cd-nav li').on('click', function (event) {
        event.preventDefault();
        var target = $(this),
            sectionTarget = target.data('menu');
        if (!target.hasClass('cd-selected')) {
            target.addClass('cd-selected').siblings('.cd-selected').removeClass('cd-selected');
            loadNewContent(sectionTarget);
        } else {
            // otherwise close navigation
            toggleNav(false);
        }
    });

    function toggleNav(bool) {
        $('.cd-nav-container, .cd-overlay').toggleClass('is-visible', bool);
        $('main').toggleClass('scale-down', bool);
        if (bool) {
            $cvs.css({display: "none"});
        } else {
            $cvs.css({display: "block"});
        }
    }

    function loadNewContent(newSection) {
        var section = $('<section class="cd-section ' + newSection + '"></section>').appendTo($main);
        section.load('/index.php/home/index/request.html?url='+newSection + ' .cd-section > *', function (event) {
            section.addClass('cd-selected').on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
                toggleNav(false);
            });
            section.prev('.cd-selected').removeClass('cd-selected');

            switch (newSection) {
                case 'index':
                    indexLoad();
                    break;
            }
        });

        $main.on('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function () {
            //once the navigation is closed, remove the old section from the DOM
            section.prev('.cd-section').remove();
        });

        if ($('.no-csstransitions').length > 0) {
            //if browser doesn't support transitions - don't wait but close navigation and remove old item
            toggleNav(false);
            section.prev('.cd-section').remove();
        }

    }

    function indexLoad() {
        loadCdTimeline(JSON.parse(window.JSONData));

        $('.index').on('scroll', function () {
            $('.cd-timeline-block').each(function () {
                if ($(this).offset().top <= $('main header').height() - $(this).height() * 0.2) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
                } else {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
                }
                if ($(this).offset().top <= -$(this).height() * 0.2) {
                    $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('bounce-in').addClass('is-hidden');
                }
            });
            if ($('main header').offset().top <= -$(window).height()) {
                cirlColor = cirColorReset;
            } else {
                cirlColor = cirColorBg;
            }
        });

        $('.cd-timeline-block').each(function () {

            var height = $(this).find('.layer-4').height();
            console.log(height);

            $(this).find('.cd-timeline-content').hover(function () {
                $(this).addClass('movie');
            }, function () {
                $(this).removeClass('movie');
            });

            $(this).find('.layer-1').height(height);
            $(this).find('.layer-3').height(height);

            $(this).find('.cd-timeline-content-inner')
                .height(height)
                .hover3d({
                    selector: ".movie__card",
                    sensitivity: 20,
                    perspective: 3000
                });
        });

        function loadCdTimeline(json) {
            var string = '';
            for (var i = 0; i < json.length; i++) {
                string+=createOneTimeline(json[i].img,json[i].timeStart,json[i].timeEnd,json[i].title,json[i].content,json[i].url);
            }
            $('#cd-timeline').append($(string));
            function createOneTimeline(img,timeStart,timeEnd,title,content,url) {
                url=url||'#0';
                return '<div class="cd-timeline-block"><div class="cd-timeline-img is-hidden"> ' +
                    '<img src="'+img+'" alt="imsunhao"> </div> <div class="cd-timeline-content is-hidden"> <div class="cd-timeline-content-inner"> <div class="movie__card"> <div class="layer-1"> </div> <div class="layer-3">' +
                    ' <span class="cd-date"> <time class="time-start">'+timeStart+'</time>-<time class="time-end">'+timeEnd+'</time> </span> </div> ' +
                    '<div class="layer-4"> <h2>'+title+'</h2> <p>'+content+'</p> <a href="'+url+'" class="cd-read-more">Read more</a> </div> </div> </div> </div> </div>'
            }
        }
    }

    (function () {
        var start = -Math.PI / 2;
        var end = start + Math.PI / 3;
        var start2 = -Math.PI / 2;
        var end2 = start + Math.PI / 6;
        var color1 = 0;
        var color2 = 0;

        function randomColor() {
            return '#' + (function (color) {
                    return (color += '0123456789abcdef'[Math.floor(Math.random() * 16)]) && (color.length == 6) ? color : arguments.callee(color);
                })('');
        }

        function reset() {
            ctx.beginPath();
            // ctx.fillRect(0,0,cvs.width,cvs.height);
            ctx.arc(50, 50, 40, 0, Math.PI * 2);
            ctx.lineWidth = 11;
            ctx.strokeStyle = cirlColor;
            ctx.stroke();
        }

        function draw() {
            ctx.beginPath();
            ctx.arc(50, 50, 40, start, end);
            ctx.lineWidth = 10;
            ctx.strokeStyle = color1;
            ctx.stroke();
        }

        function draw2() {
            ctx.beginPath();
            ctx.arc(50, 50, 40, start2, end2);
            ctx.lineWidth = 10;
            ctx.strokeStyle = color2;
            ctx.stroke();
        }

        setInterval(function () {
            reset();

            start += Math.PI / 60;
            end = start + Math.PI / 3;

            start2 += Math.PI / 30;
            end2 = start2 + Math.PI / 6;

            draw();
            draw2();
        }, 30);
        setInterval(function () {
            color1 = randomColor();
            color2 = randomColor();
        }, 100);
    })();

});


//section.load('/index.php/home/index/request.html?url='+newSection + ' .cd-section > *', function (event) {