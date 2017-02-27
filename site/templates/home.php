<?php snippet('header') ?>
    <div class="pep" id="pep">

      <!-- <article class="menu">
        <?php snippet('menu') ?>
      </article> -->

    <?php 
      $textes = page('paysages/textes')->children()->visible();
      foreach ($textes as $p): ?>
      <article class="item texte <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php echo $p->text() ?>
      </article>
    <?php endforeach ?>

    <?php 
      $pagevideo = page('paysages/video')->children()->visible();
      foreach ($pagevideo as $p): ?>
      <article class="item video <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): $thumb = $image->resize(600, 600); ?>
            <span><img src="<?= $thumb->url() ?>" height="<?= $thumb->height() ?>" data-source='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>'  data-thumb='<?= $thumb->url() ?>' />
            </span>
      <?php endif ?>
      
      </article>
    <?php endforeach ?>

    
    <?php 
      $pageimages = page('paysages/images')->children()->visible();
      foreach ($pageimages as $p): ?>
      <article class="item image <?php e($p->related() != '', 'has_related') ?>" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): $thumb = $image->resize(400, 400); ?>
            <span><img src="<?= $thumb->url() ?>" height="<?= $thumb->height() ?>" data-source='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>'  data-thumb='<?= $thumb->url() ?>' />
            </span>
      <?php endif ?>
      </article>
    <?php endforeach ?>

    <?php 
      $docs = page('paysages/documents')->children()->visible();
      foreach ($docs as $p): ?>
      <article class="item document" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): $thumb = $image->resize(400, 400); ?>
            <span><img src="<?= $thumb->url() ?>" height="<?= $thumb->height() ?>" data-source='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>'  data-thumb='<?= $thumb->url() ?>' /></span>
      <?php endif ?>
      
      </article>
    <?php endforeach ?>

    


    </div>

    <div id="clonezone">
      <div id="relzone"></div>
    </div>


<?php snippet('footer') ?>