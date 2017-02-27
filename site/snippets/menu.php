<h2>Clémentine Fort</h2>
<h1>Paysages domestiques</h1>
<p>— </p>

<ul>
    <?php
    $pages = $site->children()->not('paysages')->visible();
    foreach ($pages as $page) :?>
    <?php if ($page->externalurl() != ''): ?>
    <li><a class="showurl" data-target="#<?= $page->slug() ?>" href="<?= $page->externalurl() ?>"><?= $page->title()->html() ?></a></li>                    
    <?php else: ?>
    <li><a class="slideto" href="#<?= $page->slug() ?>"><?= $page->title()->html() ?></a></li>
    <?php endif ?>
    
    <?php endforeach ?>
</ul>