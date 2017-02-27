
      
<div id="cache">

    <?php 
      $pagevideo = page('paysages/video')->children()->visible();
      foreach ($pagevideo as $p): ?>
      <?php $thumb = $p->images()->sortBy('sort', 'asc')->first()->resize(600, 600); ?>
      <img src='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>' />            
    <?php endforeach ?>

    
    <?php 
      $pageimages = page('paysages/images')->children()->visible();
      foreach ($pageimages as $p): ?>
      
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()):  ?>
            <img src='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>'/>
      <?php endif ?>
    <?php endforeach ?>

    <?php 
      $docs = page('paysages/documents')->children()->visible();
      foreach ($docs as $p): ?>
      <?php if($image = $p->images()->sortBy('sort', 'asc')->first()):  ?>
            <img src='<?= $p->images()->sortBy('sort', 'asc')->first()->url() ?>' />
      <?php endif ?>
    <?php endforeach ?>

    

</div>   