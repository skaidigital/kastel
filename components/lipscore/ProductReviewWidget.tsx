'use client';

export function ProductReviewWidget() {
  console.log(window.lipscore);
  if (window.lipscore) {
    return (
      <div
        id="lipscore-rating"
        ls-product-name="Madla Terrain WR Coal Black"
        ls-brand="Kastel Shoes"
        ls-sku="MAD100-100-010-36;MAD100-100-010-37;MAD100-100-010-38;MAD100-100-010-39;MAD100-100-010-40;MAD100-100-010-41;MAD100-100-010-42;MAD100-100-010-43;MAD100-100-010-44;MAD100-100-010-45;MAD100-100-010-46"
        ls-product-id="6980367057064"
        ls-product-url="https://kastelshoes.com/products/madla-terrain-wr-coal-black"
        ls-description="Opplev uovertruffen komfort og værbeskyttelse med unisex vintersko fra Kastel, i en halvhøy støvlettstil, utrustet med en vanntett membran, høyt skaft, og vår spesielt utformede 'Terrain' såle for forbedret grep. Disse skoene gir deg friheten til å utforske, holde føttene tørre selv i de mest uforutsigbare værforhold. Med et enkelt og stilrent design, er disse skoene det perfekte valget for eventyreren som krever funksjonalitet og komfort i hverdagen. Utforsk med frihet i Kastel unisex vintersko."
        ls-image-url="//kastelshoes.com/cdn/shop/products/MadlaWRTerrainCoalBlack_7e9124af-2d76-44bb-8024-cad062e9d323.jpg?v=1638377419"
        ls-price="699"
        ls-price-currency="NOK"
        ls-availability="1"
        ls-category="Madla"
        data-ls-lipscore-product-id="9782487"
        data-ls-lipscore-product-instance-id="18309623"
        data-ls-product-votes="31"
        data-ls-product-rating="9.3"
        data-ls-product-review-count="18"
        data-ls-rating-distribution='{"05":21,"04":9,"03":1,"02":0,"01":0}'
        data-ls-product-attributes='[{"id":884,"options_count":3,"name":"Hvordan opplever du størrelsen?","caption":"Størrelse","labels":["Liten","Perfekt","Stor"],"summary_value":3,"votes":2}]'
      ></div>
    );
  }

  // return(<>

  // <div id="lipscore-rating"
  // ls-product-name="Madla Terrain WR Coal Black"
  // ls-brand="Kastel Shoes"
  // ls-sku="MAD100-100-010-36;MAD100-100-010-37;MAD100-100-010-38;MAD100-100-010-39;MAD100-100-010-40;MAD100-100-010-41;MAD100-100-010-42;MAD100-100-010-43;MAD100-100-010-44;MAD100-100-010-45;MAD100-100-010-46"
  // ls-product-id="6980367057064"
  // ls-product-url="https://kastelshoes.com/products/madla-terrain-wr-coal-black"
  // ls-description="Opplev uovertruffen komfort og værbeskyttelse med unisex vintersko fra Kastel, i en halvhøy støvlettstil, utrustet med en vanntett membran, høyt skaft, og vår spesielt utformede 'Terrain' såle for forbedret grep. Disse skoene gir deg friheten til å utforske, holde føttene tørre selv i de mest uforutsigbare værforhold. Med et enkelt og stilrent design, er disse skoene det perfekte valget for eventyreren som krever funksjonalitet og komfort i hverdagen. Utforsk med frihet i Kastel unisex vintersko."
  // ls-image-url="//kastelshoes.com/cdn/shop/products/MadlaWRTerrainCoalBlack_7e9124af-2d76-44bb-8024-cad062e9d323.jpg?v=1638377419"
  // ls-price="699"
  // ls-price-currency="NOK"
  // ls-availability="1"
  // ls-category="Madla"
  // data-ls-lipscore-product-id="9782487"
  // data-ls-lipscore-product-instance-id="18309623"
  // data-ls-product-votes="31"
  // data-ls-product-rating="9.3"
  // data-ls-product-review-count="18"
  // data-ls-rating-distribution="{&quot;05&quot;:21,&quot;04&quot;:9,&quot;03&quot;:1,&quot;02&quot;:0,&quot;01&quot;:0}"
  // data-ls-product-attributes="[{&quot;id&quot;:884,&quot;options_count&quot;:3,&quot;name&quot;:&quot;Hvordan opplever du størrelsen?&quot;,&quot;caption&quot;:&quot;Størrelse&quot;,&quot;labels&quot;:[&quot;Liten&quot;,&quot;Perfekt&quot;,&quot;Stor&quot;],&quot;summary_value&quot;:3,&quot;votes&quot;:2}]"
  // ></div>
  // </>)

  //   return (
  //     <div
  //       //   id="lipscore-review-list"
  //       id="lipscore-rating"
  //       data-ls-product-name="Madla Terrain Winter WR Coal Black"
  //       data-ls-brand="Kastel Shoes"
  //       data-ls-product-id="6980367057064"
  //       data-ls-product-url="https://kastelshoes.com/products/madla-terrain-wr-coal-black"
  //       //   data-ls-variant-id="9782487"
  //       //   data-ls-variant-name="36"
  //       //   data-ls-description="Product_description-used_for_SEO"
  //       //   data-ls-image-url="https://kastelshoes.com/cdn/shop/products/Alta-Coal-black-snowjogg_1600x.jpg?v=1701385796"
  //       //   data-ls-price="950"
  //       //   data-ls-price-currency="NOK"
  //       //   data-ls-availability="20"
  //       //   data-ls-category="[Product_category-used_for_SEO]"
  //       //   data-ls-gtin="[Product_GTIN-used_for_SEO]"
  //       //   data-ls-page-size="5"
  //     >
  // </div>
  //   );
}
