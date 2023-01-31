export default function FlowBoard() {
    return (
        <div class="w-100vw h-[70vh] overflow-hidden relative z-[1] bg-base-200">
            <div class="w-full h-full top-0 left-0 absolute origin-top-left">
                <svg
                    id="svg" width="916" height="948"
                    class="w-full h-full top-0 left-0 absolute origin-top-left overflow-visible"
                >
                    <defs></defs>
                    <g></g>
                </svg>
                <div id="nodes"></div>
            </div>
        </div>
    );
}
