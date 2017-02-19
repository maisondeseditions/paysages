<!doctype html>
<html lang="<?= site()->language() ? site()->language()->code() : 'fr' ?>">
<head>

  <meta charset="utf-8">

  <title><?= $site->title()->html() ?> | <?= $page->title()->html() ?></title>
  <meta name="description" content="<?= $site->description()->html() ?>">
  
  <meta name="viewport" content="width=device-width,initial-scale=1.0">

  <!-- Desktop Browsers -->
  <link rel="shortcut icon" type="image/x-icon" href="<?= url('assets/img/favicon.ico') ?>" />

  <!-- Android: Chrome M39 and up-->
  <link rel="manifest" href="<?= url('assets/manifest.json')?>">
  <!-- Android: Chrome M31 and up, ignored if manifest is present-->
  <meta name="mobile-web-app-capable" content="yes">
  <link rel="icon" sizes="192x192" href="<?= url('assets/icon-192x192.png')?>">
  <!-- iOS -->
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-title" content="<?= $site->title()->html() ?>">

  <link rel="apple-touch-icon" sizes="180x180" href="<?= url('assets/img/apple-touch-icon-180x180-precomposed.png')?>">
  <link href="<?= url('assets/img/apple-touch-icon-152x152-precomposed.png')?>" sizes="152x152" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-144x144-precomposed.png')?>" sizes="144x144" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-120x120-precomposed.png')?>" sizes="120x120" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-114x114-precomposed.png')?>" sizes="114x114" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-76x76-precomposed.png')?>" sizes="76x76" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-72x72-precomposed.png')?>" sizes="72x72" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-60x60-precomposed.png')?>" sizes="60x60" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-57x57-precomposed.png')?>" sizes="57x57" rel="apple-touch-icon">
  <link href="<?= url('assets/img/apple-touch-icon-precomposed.png')?>" rel="apple-touch-icon">

  <?= css('assets/css/main.css') ?>
  <?= css('assets/fonts/style.css') ?>

</head>
<body class="">

  <nav>
    <div class="hamburger" id="hamburger-2">
      <span class="line"></span>
      <span class="line"></span>
      <span class="line"></span>
    </div>

    <div class="menu">
      <h2>Clémentine Fort</h2>
      <h1>Paysages domestiques</h1>
      <p>— </p>
      
      <ul>
      <?php 
        $pages = $site->children()->not('paysages')->visible();
        foreach ($pages as $page) :?>
        <?php if ($page->externalurl() != ''): ?>
          <li><a href="<?= $page->externalurl() ?>"><?= $page->title()->html() ?></a></li>
        
        <?php else: ?>
          <li><a class="slideto" href="#<?= $page->slug() ?>"><?= $page->title()->html() ?></a></li>
  <?php endif ?>
        
      <?php endforeach ?>
      </ul>
      
    </div>
  </nav>

  <?php foreach ($pages as $page) :?>
  <?php if ($page->externalurl() == ''): ?>
  <div class="slide" id="<?= $page->slug() ?>">
    <div class="content">
      <?= $page->title()->html() ?>
    <?= $page->text()->kirbytext() ?>
    </div>
  </div>
  <?php endif ?>
  <?php endforeach ?>