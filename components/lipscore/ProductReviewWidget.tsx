'use client';

export function ProductReviewWidget() {
  const isClient = typeof window !== 'undefined';
  if (isClient && window.lipscore) {
    console.log('Lipscore is already loaded and initialized.');
  } else {
    console.log('Lipscore is not loaded and initialized.');
  }
  return (
    <div
      id="lipscore-rating"
      data-ls-product-name="Madla Terrain WR Coal Black"
      data-ls-brand="Kastel Shoes"
      data-ls-product-id="6980367057064"
      data-ls-product-url="https://kastelshoes.com/products/madla-terrain-wr-coal-black"
    ></div>
    // <div
    //   id="lipscore-rating"
    //   ls-product-name="Madla Terrain WR Coal Black"
    //   ls-brand="Kastel Shoes"
    //   ls-sku="MAD100-100-010-36;MAD100-100-010-37;MAD100-100-010-38;MAD100-100-010-39;MAD100-100-010-40;MAD100-100-010-41;MAD100-100-010-42;MAD100-100-010-43;MAD100-100-010-44;MAD100-100-010-45;MAD100-100-010-46"
    //   ls-product-id="6980367057064"
    //   ls-product-url="https://kastelshoes.com/products/madla-terrain-wr-coal-black"
    //   ls-description="Opplev uovertruffen komfort og værbeskyttelse med unisex vintersko fra Kastel, i en halvhøy støvlettstil, utrustet med en vanntett membran, høyt skaft, og vår spesielt utformede 'Terrain' såle for forbedret grep. Disse skoene gir deg friheten til å utforske, holde føttene tørre selv i de mest uforutsigbare værforhold. Med et enkelt og stilrent design, er disse skoene det perfekte valget for eventyreren som krever funksjonalitet og komfort i hverdagen. Utforsk med frihet i Kastel unisex vintersko."
    //   ls-image-url="//kastelshoes.com/cdn/shop/products/MadlaWRTerrainCoalBlack_7e9124af-2d76-44bb-8024-cad062e9d323.jpg?v=1638377419"
    //   ls-price="699"
    //   ls-price-currency="NOK"
    //   ls-availability="1"
    //   ls-category="Madla"
    //   data-ls-lipscore-product-id="7760617505018"
    //   data-ls-lipscore-product-instance-id="9426053"
    //   data-ls-product-votes="31"
    //   data-ls-product-rating="9.3"
    //   data-ls-product-review-count="18"
    //   data-ls-rating-distribution='{"05":21,"04":9,"03":1,"02":0,"01":0}'
    //   data-ls-product-attributes='[{"id":884,"options_count":3,"name":"Hvordan opplever du størrelsen?","caption":"Størrelse","labels":["Liten","Perfekt","Stor"],"summary_value":3,"votes":2}]'
    // ></div>
  );
}
