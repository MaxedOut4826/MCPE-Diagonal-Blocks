import { world } from "@minecraft/server";
import { NAMESPACE, VANILLA_NAMESPACE } from "../../constants/namespace";
import { blocksOverrideRegistry } from "../../constants/blockOverrideRegistry";

world.afterEvents.playerPlaceBlock.subscribe((data) => {
    const { block, dimension } = data;
    const id = block.typeId;

    if (!blocksOverrideRegistry.includes(id)) {
        return;
    }

    const blockOverrideId = id.replace(VANILLA_NAMESPACE, NAMESPACE);

    dimension.setBlockType(block.location, blockOverrideId);
    data.cancel;
});
