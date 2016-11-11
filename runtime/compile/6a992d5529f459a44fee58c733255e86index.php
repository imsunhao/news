<!DOCTYPE html>
<html lang="zh">
<head>
    <meta charset="UTF-8">
    <title>我是孙颢 web前端工程师</title>
    <meta name="keywords" content="个人网站,前端, 前端开发, web前端, 前端开发工程师, CSS, JavaScript, HTML, Web标准">
    <link rel="stylesheet" href="stylesheets/imsunhao.css">
    <script src="lib/jquery/js/jquery-3.1.0.min.js"></script>
    <script src="lib/jquery/js/jquery.hover3d.min.js"></script>
    <script src="lib/modernizr.js"></script>
    <script>window.JSONData='<?php echo $this->vars['JSONData']; ?>';</script>
    <script src="javascript/main.js"></script>
</head>
<body>
<a class="cd-nav-trigger">
    Menu<span></span>
</a>
<canvas id="cvs" width="200" height="200"></canvas>
<main>
    <section class="cd-section index cd-selected">
        <header>
            <div class="cd-title">
                <div class="svg-font">
                    <svg viewBox="0 0 600 100">
                        <clippath id="cp-text">
                            <text text-anchor="middle" x="50%" y="50%" dy=".35em" class="text--line">
                                imsunhao
                            </text>
                        </clippath>
                        <g clip-path="url(#cp-text)" class="colortext">
                            <rect width="100%" height="100%" class="anim-shape"></rect>
                            <rect width="80%" height="100%" class="anim-shape"></rect>
                            <rect width="60%" height="100%" class="anim-shape"></rect>
                            <rect width="40%" height="100%" class="anim-shape"></rect>
                            <rect width="20%" height="100%" class="anim-shape"></rect>
                        </g>
                        <use xlink:href="#s-text" class="text--transparent"></use>
                    </svg>
                </div>
            </div>
        </header>
        <div class="cd-content">
            <section id="cd-timeline" class="cd-container"></section>
        </div>
    </section>
</main>

<nav class="cd-nav-container" id="cd-nav">
    <header>
        <h3>imsunhao</h3>
        <a class="cd-close-nav">Close</a>
    </header>
    <ul class="cd-nav">
        <li class="cd-selected" data-menu="index">
            <a>
                <span><i class="glyphicon glyphicon-tower"></i></span>
                <em>项目经历</em>
            </a>
        </li>

        <li data-menu="projects">
            <a>
                <span><i class="glyphicon glyphicon-stats"></i></span>
                <em>个人情况</em>
            </a>
        </li>

        <li data-menu="about">
            <a>
                <span><i class="glyphicon glyphicon-user"></i></span>
                <em>专业技能</em>
            </a>
        </li>

        <li data-menu="services">
            <a>
                <span><i class="glyphicon glyphicon-thumbs-up"></i></span>
                <em>企业文化</em>
            </a>
        </li>

        <li data-menu="careers">
            <a>
                <span><i class="glyphicon glyphicon-cutlery"></i></span>
                <em>生活技能</em>
            </a>
        </li>
        <li data-menu="contact">
            <a>
                <span><i class="glyphicon glyphicon-send"></i></span>
                <em>联系方式</em>
            </a>
        </li>
    </ul>
</nav>

<div class="cd-overlay"></div>
</body>
</html>