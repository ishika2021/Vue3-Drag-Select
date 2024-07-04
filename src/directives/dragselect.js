import { nextTick } from "vue";
export default {
  mounted(el, binding) {
    let isSelecting = false; // if the selection has started
    let selectionSquare = null; // holds the selection sqaure element
    let initialX = null; // the initial mouse click - x
    let initialY = null; // the initial mouse click - y
    let selectableElements = [];

    const updateselectableElements = () => {
      nextTick(() => {
        selectableElements = el.querySelectorAll(".selectable"); // add "selectable" class to the items that needs selection
      });
    };
    updateselectableElements();
    
    const getSelectedItems = binding.value.getSelectedItems;

    const checkSelectedItem = (selectedArea) => {
      const { left, top, right, bottom } = selectedArea.getBoundingClientRect();
      const selectedItems = [];
      selectableElements.forEach((selectable) => {
        const {
          left: elLeft,
          top: elTop,
          right: elRight,
          bottom: elBottom,
        } = selectable.getBoundingClientRect();
        if (
          elRight > left && //right edge of ele lies on right side of selection area's left edge
          elBottom > top && //bottom edge of ele lies below the selection area's top edge
          elLeft < right && //left edge of ele lies on left side of selection area's right edge
          elTop < bottom //top edge of ele lies above the selection area's bottom edge
        ) {
          const itemId = selectable.dataset.id;
          selectable.classList.add("selected");
          if (itemId) {
            selectedItems.push(itemId);
          }
        } else {
          selectable.classList.remove("selected");
        }
      });
      getSelectedItems(selectedItems);
    };

    const createSelectionSquare = (x, y) => {
      const div = document.createElement("div");
      div.classList.add("drag-select");
      div.style.left = x + "px";
      div.style.top = y + "px";
      div.style.width = "0";
      div.style.height = "0";
      document.body.append(div);
      return div;
    };

    const handleMouseDown = (event) => {
        if(!isSelecting){
            getSelectedItems([]); //empty the previous selected items
        }
      isSelecting = true;
      initialX = event.pageX;
      initialY = event.pageY;
      selectionSquare = createSelectionSquare(initialX, initialY);
      selectableElements.forEach((item) => item.classList.remove("selected"));
    };

    const handleMouseMove = (event) => {
      if (!isSelecting) return;
      const currentX = event.pageX;
      const currentY = event.pageY;
      const diffX = currentX - initialX;
      const diffY = currentY - initialY;
      selectionSquare.style.left = diffX < 0 ? currentX + "px" : initialX + "px";
      selectionSquare.style.top = diffY < 0 ? currentY + "px" : initialY + "px";
      selectionSquare.style.width = Math.abs(diffX) + "px";
      selectionSquare.style.height = Math.abs(diffY) + "px";
      checkSelectedItem(selectionSquare);
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        isSelecting = false;
        selectionSquare.remove();
      }
    };

    el.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    el.cleanup = () => {
      el.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  },
  unmounted(el) {
    el.cleanup();
  },
};
