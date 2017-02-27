<?php snippet('header') ?>
    <div class="pep" id="pep">

      
    <?php 
      $textes = page('paysages/textes')->children()->visible();
      foreach ($textes as $p): ?>
      <article class="item texte <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure()->limit(3) as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php echo $p->text() ?>
      </article>
    <?php endforeach ?>

    <?php 
      $pagevideo = page('paysages/video')->children()->visible();
      foreach ($pagevideo as $p): ?>
      <?php $image = $p->images()->sortBy('sort', 'asc')->first(); ?>
      <article class="item video <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure()->limit(3) as $r): ?><?= $r ?> <?php endforeach ?>"
        data-videosrc="<?php echo($p->videos()->first()->url()) ?>"
        data-poster="<?= $image->url() ?>"
        >
            <span><img src="<?= $image->url() ?>" height="<?= $image->height() ?>"/>
            </span>
            <video src="<?php echo($p->videos()->first()->url()) ?>" poster="<?= $image->url() ?>" ></video>
      </article>
    <?php endforeach ?>

    
    <?php 
      $pageimages = page('paysages/images')->children()->visible();
      foreach ($pageimages as $p): ?>
      <article class="item image <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure()->limit(3) as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): ?>
            <span><img src="<?= $image->url() ?>" height="<?= $image->height() ?>" /></span>
      <?php endif ?>
      
      </article>
    <?php endforeach ?>

    <?php 
      $docs = page('paysages/documents')->children()->visible();
      foreach ($docs as $p): ?>
      <article class="item document" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure()->limit(3) as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): ?>
            <span><img src="<?= $image->url() ?>" height="<?= $image->height() ?>" /></span>
      <?php endif ?>
      
      </article>
    <?php endforeach ?>
    

    </div>

    <div id="clonezone">
      <div id="relzone"></div>
    </div>



<?php snippet('footer') ?>