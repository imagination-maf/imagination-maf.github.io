export default {
    'mode': 'staging',
    'url': {
        'staging': 'https://staging.imagination-maf.com/api/',
        'live': ''
    },
    'galleryUrl': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/',
    'masterplan-inactive': ['app_x5F_Lebanon-region--parent', 'app_x5F_Lebanon--parent', 'app_x5F_Lebanon-road--parent', 'app_x5F_Oman--parent', 'app_x5F_Muscat--parent', 'app_x5F_Muscat-road--parent', 'app_x5F_Dubai--parent', 'app_x5F_Dubai-road--parent'],
    'mappings': {
        'app_x5F_Sharjah-road--parent': 'alzahia'
    },
    markerDefault: [
        {
            'id': 'app_x5F_world--parent',
            'marker': null
        },
        {
            'id': 'app_x5F_UAE--parent',
            'marker': 'uae'
        },
        {
            'id': 'app_x5F_Oman--parent',
            'marker': 'oman'
        },
        {
            'id': 'app_x5F_Lebanon-region--parent',
            'marker': 'lebanon'
        }
    ],
    soldOut: [
        {
            'id': 'aljouri',
            'title': 'AL JOURI',
            'text': 'Al Jouri is Al Zahia\'s first neighbourhood, comprising a range of villa and town houses. This neighbourhood is fully handed over and occupied. Regular community events take place at the Tree Park, the neighbourhood park, which includes a variety of fitness and kids facilities.',
            'image': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/alzahia/soldout/aljouri/hero.jpg',
            'image-text': 'FULLY OCCUPIED',
        },
        {
            'id': 'alnarjis',
            'title': 'AL NARJIS',
            'text': 'Al Narjis is the second neighbourhood in Al Zahia, featuring a range of villas and town houses in various sizes. Al Narjis is over 90% sold and is currently in its construction phase with handover scheduled for mid-2018',
            'image': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/alzahia/soldout/alnarjis/hero.jpg',
            'image-text': 'HANDOVER IN 2018',
        },
        {
            'id': 'gardenapts',
            'title': 'GARDEN APARTMENTS',
            'text': 'The Garden Apartments feature a wide range of apartments in various sizes. These are sold out and in their final construction phase with handover scheduled for mid-2018.',
            'image': 'https://s3-eu-west-1.amazonaws.com/maf-gallery-images/alzahia/soldout/gardenapts/hero.jpg',
            'image-text': 'HANDOVER IN 2018',
        }
    ],
    dataPoints: {
        alzahia: {
            allilac: {
                'fullname': 'AL LILAC',
                'plot_boundary': 'AL_LILAC_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_LILAC'],
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            },
            aljouri: {
                'fullname': 'AL JOURI',
                'plot_boundary': 'AL_JOURI_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_JOURI'],
                'svg': {
                    'scale': 2.625,
                    'translate': [50, 316]
                }
            },
            alnarjis: {
                'fullname': 'AL NARJIS',
                'plot_boundary': 'AL_NARJIS_PLOTS',
                'amenities': ['AMENITIES_x5F_AL_NARJIS'],
                'svg': {
                    'scale': 3.3,
                    'translate': [201, -198]
                }
            },
            gardenapts: {
                'fullname': 'Garden Apartments',
                'plot_boundary': 'AL_ZAHIA_PLOT_BOUNDARIES',
                'amenities': [],
                'svg': {
                    'scale': 3.2,
                    'translate': [598, 280]
                }
            }
        }
    },
    availablityMap: {
        'available': ['Available'],
        'unavailable': ['Sold', 'Sale pending', 'Unavailable', 'Booked', 'Reserved', 'Unassigned']
    },
    logoMapping: {
        'app_x5F_world--parent': 'maf',
        'app_x5F_UAE--parent': 'maf',
        'app_x5F_Sharjah--parent': 'alzahia',
        'app_x5F_Sharjah-road--parent': 'alzahia',
        'app_x5F_Dubai--parent': 'tilalalghaf',
        'app_x5F_Dubai-road--parent': 'tilalalghaf',
        'app_x5F_Lebanon-region--parent': 'waterfront',
        'app_x5F_Lebanon--parent': 'waterfront',
        'app_x5F_Lebanon-road--parent': 'waterfront',
        'app_x5F_Oman--parent': 'almouj',
        'app_x5F_Muscat--parent': 'almouj',
        'app_x5F_Muscat-road--parent': 'almouj',
    },
    houseTypes: {
        'villa': ['Boutique villa', 'Villa Plus', 'Villa', 'villa', 'Courtyard'],
        'townhouse': ['Town house Plus', 'Town house'],
        'apartment': ['Apartments', 'Apartment'],
        'office': ['Offices']
    },
    houseTypeNames: {
        'apartmentStudio': 'Apartment Studio',
        'villa3': '3-Bedroom Villa',
        'apartment1': '1-Bedroom Apartment',
        'villa4': '4-Bedroom Villa',
        'apartment2': '2-Bedroom Apartment',
        'villa5': '5-Bedroom Villa',
        'apartment3': '3-Bedroom Apartment',
        'villa6': '6-Bedroom Villa',
        'townhouse2': '2-Bedroom Townhouse',
        'townhouse3': '3-Bedroom Townhouse',
        'townhouse4': '4-Bedroom Townhouse'
    },
    neighbourhoodNames: {
        'allilac': 'AL LILAC',
        'aljouri': 'AL JOURI',
        'alnarjis': 'AL NARJIS',
        'gardenapts': 'GARDEN APARTMENTS'
    }
}
