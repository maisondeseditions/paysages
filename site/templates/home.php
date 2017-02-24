<?php snippet('header') ?>
    <div id="pepwrapper">
    <div class="pep" id="pep">

    <?php 
      $textes = page('paysages/textes')->children()->visible()->limit(300);
      foreach ($textes as $p): ?>
      <article class="texte" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php echo $p->text() ?>
      </article>
    <?php endforeach ?>

    
    <?php 
      $pageimages = page('paysages/images')->children()->visible()->limit(300);
      foreach ($pageimages as $p): ?>
      <article class="image" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): $thumb = $image->resize(400, 400); ?>
            <img src="<?= $thumb->url() ?>" height="<?= $thumb->height() ?>" data-source='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>' />
            <img src="<?= url('assets/img/pix.png')  ?>" data-src="<?= url('assets/img/pix.png')  ?>">
      <?php endif ?>
      </article>
    <?php endforeach ?>

    <?php 
      $docs = page('paysages/documents')->children()->visible()->limit(300);
      foreach ($docs as $p): ?>
      <article class="document" id="<?php echo $p->slug() ?>" 
        data-related="<?php foreach ($p->related()->toStructure() as $r): ?><?= $r ?> <?php endforeach ?>"
        >
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()): $thumb = $image->resize(400, 400); ?>
            <img src="<?= $thumb->url() ?>" height="<?= $thumb->height() ?>" data-source='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>' />
            <img src="<?= url('assets/img/pix.png')  ?>" data-src="<?= url('assets/img/pix.png')  ?>">
      <?php endif ?>
      
      </article>
    <?php endforeach ?>

    


    </div>

  </div>

<?php snippet('footer') ?>