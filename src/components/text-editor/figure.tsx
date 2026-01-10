import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import FigureView from "./figure-view";
import { Plugin, PluginKey } from '@tiptap/pm/state';

export const Figure = Node.create({
    name: "figure",
    group: "block",
    content: "image figcaption?",
    atom: true,
    draggable: true,
    selectable: true,
    addAttributes() {
        return {
            src: {default: null},
            alt: {default: null},
            title: {default: null},
            width: {default: "100%"},
            align: {default: "center"}
        };
    },
    parseHTML() {
        return [{
            tag: "figure",
            getAttrs: (el: HTMLElement) => {
                const img = el.querySelector("img");
                return {
                    src: img?.getAttribute("src"),
                    alt: img?.getAttribute("alt"),
                    title: img?.getAttribute("title")
                };
            }
        }];
    },
    renderHTML({ HTMLAttributes }) {
        return ["figure", mergeAttributes(HTMLAttributes), 0];
    },
    addNodeView() {
        return ReactNodeViewRenderer(FigureView);
    },
    addProseMirrorPlugins() {
        return [
            new Plugin({
                key: new PluginKey("figurePasteHandler"),
                props: {
                    handlePaste: (view, event) => {
                        const {clipboardData} = event;
                        if(!clipboardData) return false;

                        const file = clipboardData.files[0];
                        if(file && file.type.startsWith("image/")) {
                            event.preventDefault();

                            const reader = new FileReader();
                            reader.onload = (e) => {
                                const src = e.target?.result as string;
                                const node = this.type.create({src}, [this.editor.schema.nodes.image.create({src})]);
                                const transaction = view.state.tr.replaceSelectionWith(node);
                                view.dispatch(transaction);
                            };
                            reader.readAsDataURL(file);
                            return true; 
                        }
                        return false;
                    }
                }
            })
        ];
    }
});