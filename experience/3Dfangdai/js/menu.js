var Menu = (function () {

    var $container = $('#rm-container'),
        $cover = $container.find('div.rm-cover'),
        $right = $container.find('div.rm-right'),
        $open = $cover.find('a.rm-button-open'),
        $close = $right.find('span.rm-close'),

        init = function () {
            initEvents();
        },
        initEvents = function () {
            $open.on('click', function (event) {
                openMenu('rm-open');
                return false;
            });
            $close.on('click', function (event) {

                closeMenu('rm-open');
                return false;

            });
        },
        openMenu = function (Menu) {

            $container.addClass(Menu);

        },
        closeMenu = function (Menu) {

            $container.removeClass(Menu + ' rm-nodelay rm-in');

        };
    return {init: init};
})();