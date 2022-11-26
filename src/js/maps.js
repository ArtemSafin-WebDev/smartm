import { PAGE_ENTER, PAGE_LEAVE } from './constants';
import { IS_MOBILE } from './utils';

export default function maps() {
    ymaps.ready(initMap);

    function initMap() {
        let instances = [];

        function initializeMaps(context = document) {
            const elements = Array.from(context.querySelectorAll('.js-map'));

            elements.forEach(element => {
                const center = element.getAttribute('data-center').split(',');
                const coords = element.getAttribute('data-coords').split(',');
                const zoom = element.getAttribute('data-zoom');
                const mapElement = element.querySelector('.js-map-element');

                const mapInstance = new ymaps.Map(mapElement, {
                    center: IS_MOBILE ? coords : center,
                    zoom: zoom ? zoom : 12,
                    controls: []
                });

                mapInstance.behaviors.disable('scrollZoom');

                const zoomControl = new ymaps.control.ZoomControl({
                    options: {
                        size: 'small',
                        position: {
                            left: 10,
                            bottom: 40
                        }
                    }
                });
                mapInstance.controls.add(zoomControl);
                instances.push(mapInstance);

                const objectManager = new ymaps.ObjectManager({
                    geoObjectOpenBalloonOnClick: false,
                    clusterize: false
                });
                mapInstance.geoObjects.add(objectManager);

                const objectToAdd = {
                    id: coords.join('-'),
                    type: 'Feature',
                    geometry: {
                        type: 'Point',
                        coordinates: coords
                    },
                    options: {
                        balloonShadow: false,
                        hideIconOnBalloonOpen: false,
                        iconColor: '#fc3503'
                    }
                };
                objectManager.add(objectToAdd);
            });
        }

        function destroyMaps() {
            instances.forEach(instance => instance.destroy());
            instances = [];
        }

        initializeMaps();

        document.addEventListener(PAGE_LEAVE, event => {
            destroyMaps();
        });

        document.addEventListener(PAGE_ENTER, event => {
            initializeMaps(event.detail.container);
        });
    }
}
