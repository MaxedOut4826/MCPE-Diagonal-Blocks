import { system } from "@minecraft/server";
import { registerComponentOctogonalConnections } from "../../components/octogonalConnections";

system.beforeEvents.startup.subscribe(({ blockComponentRegistry }) => {
    registerComponentOctogonalConnections(blockComponentRegistry);
});
