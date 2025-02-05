export const environmentObscuranceData = [
    {
        title: "Lightly obscured",
        icon: "🌫️",
        subtitle: "Disadvantage on Perception",
        description: "Dim light, patchy fog, moderate foliage",
        reference: "PHB, pg. 183.",
        bullets: [
            "Creatures have disadvantage on Wisdom (Perception) checks that rely on sight."
        ]
    },
    {
        title: "Heavily obscured",
        icon: "⚫",
        subtitle: "Effectively blind",
        description: "Darkness, opaque fog, dense foliage",
        reference: "PHB, pg. 183.",
        bullets: [
            "A creature in a heavily obscured area effectively suffers from the blinded condition."
        ]
    }
]

export const environmentLightData = [
    {
        title: "Bright light",
        icon: "☀️",
        subtitle: "Normal vision",
        description: "Bright light lets most creatures see normally",
        reference: "PHB, pg. 183.",
        bullets: [
            "Gloomy days still provide bright light, as do torches, lanterns, fires, and other sources of illumination within a specific radius."
        ]
    },
    {
        title: "Dim light",
        icon: "🌓",
        subtitle: "Lightly obscured",
        description: "Dim light, also called shadows",
        reference: "PHB, pg. 183.",
        bullets: [
            "Creates a lightly obscured area.",
            "An area of dim light is usually a boundary between a source of bright light, such as a torch, and surrounding darkness.",
            "The soft light of twilight and dawn also counts as dim light. A particularly brilliant full moon might bathe the land in dim light."
        ]
    },
    {
        title: "Darkness",
        icon: "🌑",
        subtitle: "Heavily obscured",
        description: "Darkness creates a heavily obscured area",
        reference: "PHB, pg. 183.",
        bullets: [
            "Creates a heavily obscured area.",
            "Characters face darkness outdoors at night (even most moonlit nights), within the confines of an unlit dungeon or a subterranean vault, or in an area of magical darkness."
        ]
    }
]

export const environmentVisionData = [
    {
        title: "Blindsight",
        icon: "👁️",
        subtitle: "Perceive without sight",
        description: "Perceive your surroundings without relying on sight, within a certain radius",
        reference: "PHB, pg. 183.",
        bullets: [
            "Creatures without eyes, such as oozes, and creatures with echolocation or heightened senses, such as bats and true dragons, have this sense."
        ]
    },
    {
        title: "Darkvision",
        icon: "🦉",
        subtitle: "Limited vision in darkness",
        description: "A creature with Darkvision can see better in the dark or low light conditions, within a certain radius",
        reference: "PHB, pgs. 183-184.",
        bullets: [
            "Within a specified range, a creature with darkvision can see in darkness as if the darkness were dim light, so areas of darkness are only lightly obscured as far as that creature is concerned.",
            "However, the creature can't discern color in darkness, only shades of gray.",
            "Many creatures in the worlds of D&D, especially those that dwell underground, have darkvision."
        ]
    },
    {
        title: "Truesight",
        icon: "🔮",
        subtitle: "See in darkness",
        description: "A creature with truesight can see everything in its true form, independent of the environment",
        reference: "PHB, pg. 184.",
        bullets: [
            "A creature with truesight can, out to a specific range, see in normal and magical darkness, see invisible creatures and objects, automatically detect visual illusions and succeed on saving throws against them, and perceives the original form of a shapechanger or a creature that is transformed by magic.",
            "Furthermore, the creature can see into the Ethereal Plane."
        ]
    }
]

export const environmentCoverData = [
    {
        title: "Half cover",
        icon: "🛡️",
        subtitle: "Low wall, furniture",
        description: "A target has half cover if an obstacle blocks at least half of its body",
        reference: "PHB, pg. 196.",
        bullets: [
            "The obstacle might be a low wall, a large piece of furniture, a narrow tree trunk, or a creature, whether that creature is an enemy or a friend.",
            "A target with half cover has a +2 bonus to AC and Dexterity saving throws.",
            " If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    },
    {
        title: "Three-quarters cover",
        icon: "🛡️🛡️",
        subtitle: "Portcullis, arrow slit",
        description: "A target has three-quarters cover if about three-quarters of it is covered by an obstacle",
        reference: "PHB, pg. 196.",
        bullets: [
            "The obstacle might be a portcullis, an arrow slit, or a thick tree trunk.",
            "A target with three-quarters cover has a +5 bonus to AC and Dexterity saving throws.",
            " If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    },
    {
        title: "Full cover",
        icon: "🛡️🛡️🛡️",
        subtitle: "Completely concealed",
        description: "A target has total cover if it is completely concealed by an obstacle",
        reference: "PHB, pg. 196.",
        bullets: [
            "A target with total cover can't be targeted directly by an attack or a spell, although some spells can reach such a target by including it in an area of effect.",
            "If a target is behind multiple sources of cover, only the most protective degree of cover applies"
        ]
    }
]
