import G2 from '@antv/g2';


const data = [
    { genre: 'Sports', sold: 275 },
    { genre: 'Strategy', sold: 1150 },
    { genre: 'Action', sold: 120 },
    { genre: 'Shooter', sold: 350 },
    { genre: 'Other', sold: 150 },
];


const chart = new G2.Chart({
    container: 'c1',
    width: 500,
    height: 500
});

chart.source(data);
chart.interval().position('genre*sold').color('genre');
chart.render();