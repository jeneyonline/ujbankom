var conf = {
    //'url': 'http://marlow.wi24.hu/generated/',
    'termek': {
        'sorrend': ['ht', 'fd', 'bkt', 'szsz', 'szhej'],
        'def_url': 'szegmens-offline.html',
        'no': 'N',
        'ht': {//hitelkartya tipus
            'max': 3,
            'A': { 'url': 'erste-visa-classic-hitelkartya' },
            'B': { 'url': 'erste-max-hitelkartya' },
            'C': { 'url': 'erste-platinum-hitelkartya' },
            'D': { 'url': 'erste-wizz-air-hitelkartya' },
            'E': { 'url': 'erste-max-hitelkartya-telekom' }
        },
        'fd': {//folyoszamla dijcsomag
            'max': 1,
            'A': { 'url': 'erste-comfort-plus-folyoszamla' },
            'B': { 'url': 'erste-control-plus-folyoszamla' },
            'C': { 'url': 'erste-global-plus-folyoszamla' },
            'D': { 'url': 'erste-net-plus-folyoszamla' },
            'E': { 'url': 'erste-premium-c-plus-folyoszamla' },
            'F': { 'url': 'erste-premium-plus-folyoszamla' },
            'G': { 'url': 'erste-private-c-plus-folyoszamla' },
            'H': { 'url': 'erste-top-plus-folyoszamla' },
            'I': { 'url': 'erste-world-plus-folyoszamla' },
            'J': { 'url': 'erste-world-private-plus-folyoszamla' },
            'K': { 'url': 'erste-world-vip-folyoszamla' }
        },
        'bkt': {//beteti kartya tipus
            'max': 1,
            'A': { 'segment': ''},
            'B': { 'segment': ''}
        },
        'szsz': {//szamla szegmens
            'max': 1,
            'A': { 'segment': 'mass' },
            'B': { 'segment': 'premium' },
            'C': { 'segment': 'world' },
            'D': { 'segment': 'private' },
            'N': { 'segment': 'mass' }
        },
        'szhej': {//szemelyi hitel es jelzaloghitel
            'max': 1,
            'A': { 'segment': '' }
        }
    }
};