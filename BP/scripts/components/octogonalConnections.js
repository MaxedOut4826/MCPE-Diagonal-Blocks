import { BlockComponentRegistry, system } from "@minecraft/server";
import { RELATIVE_CORNERS } from "../constants/relativeCorners";

import { NAMESPACE } from "../constants/namespace";

const CUSTOM_COMPONENT_KEY = NAMESPACE + "octogonal_connections";

/**
 * @param {BlockComponentRegistry} blockComponentRegistry
 */
export function registerComponentOctogonalConnections(blockComponentRegistry) {
    blockComponentRegistry.registerCustomComponent(CUSTOM_COMPONENT_KEY, {
        onPlace(data) {
            const { block, dimension } = data;

            const permutation = updateConnectors(
                block,
                true,
                block.permutation,
            );

            system.run(() => {
                dimension.setBlockPermutation(block.location, permutation);
            });

            data.cancel = true;
        },

        onBreak({ block }) {
            updateConnectors(block, false);
        },
    });
}

/**
 * @param {Block} block
 * @param {boolean} state
 * @param {BlockPermutation} [permutation]
 * @returns {BlockPermutation | undefined}
 */
function updateConnectors(block, state, permutation) {
    for (const { block: connector, corner } of getDiagonalConnectors(block)) {
        if (permutation !== undefined) {
            permutation = permutation.withState(corner.state, state);
        }

        setState(connector, corner.mirrorState, state);
    }

    return permutation;
}

/**
 * @param {Block} block
 * @returns {Array<{block: Block, corner: {state: string, offset: import("@minecraft/server").Vector3, mirrorState: string}}>}
 */
function getDiagonalConnectors(block) {
    const { x: x0, y: y0, z: z0 } = block.location;
    const dimension = block.dimension;

    let corners = [];

    for (const corner of RELATIVE_CORNERS) {
        const { x: x1, z: z1 } = corner.offset;
        const cornerPosition = {
            x: x0 + x1,
            y: y0,
            z: z0 + z1,
        };

        const block = dimension.getBlock(cornerPosition);
        const cornerComponent = block.getComponent(CUSTOM_COMPONENT_KEY);

        if (cornerComponent === undefined) {
            continue;
        }

        corners.push({
            block: block,
            corner: corner,
        });
    }

    return corners;
}

/**
 * @param {Block} block
 * @param {string} stateName
 * @param {boolean | number | string} value
 */
function setState(block, stateName, value) {
    system.run(() => {
        block.setPermutation(block.permutation.withState(stateName, value));
    });
}
