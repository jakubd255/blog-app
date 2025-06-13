"use client";

// @ts-nocheck
/* eslint-disable */

import Image from "@tiptap/extension-image";
import { type NodeViewProps, NodeViewWrapper, ReactNodeViewRenderer } from "@tiptap/react";
import { AlignCenter, AlignLeft, AlignRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const ImageExtension = Image.extend({
    addAttributes: () => ({
        src: {default: null},
        alt: {default: null},
        title: {default: null},
        width: {default: "100%"},
        height: {default: null},
        align: {default: "center"},
        caption: {default: ""},
        aspectRatio: {default: null}
    }),
    addNodeView: () => ReactNodeViewRenderer(TiptapImage)
});

const TiptapImage = (props: NodeViewProps) => {
    const { node, editor, selected, updateAttributes } = props;
    const imageRef = useRef<HTMLImageElement | null>(null);
    const nodeRef = useRef<HTMLDivElement | null>(null);
    const [resizing, setResizing] = useState(false);
    const [resizingPosition, setResizingPosition] = useState<"left" | "right">("left");
    const [resizeInitialWidth, setResizeInitialWidth] = useState(0);
    const [resizeInitialMouseX, setResizeInitialMouseX] = useState(0);
    const [openedMore, setOpenedMore] = useState(false);

    const handleResizingPosition = ({e, position}: {e: React.MouseEvent<HTMLDivElement, MouseEvent>, position: "left" | "right"}) => {
        startResize(e);
        setResizingPosition(position);
    }

    const startResize = (event: React.MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setResizing(true);
        setResizeInitialMouseX(event.clientX);
        if(imageRef.current) {
            setResizeInitialWidth(imageRef.current.offsetWidth);
        }
    }

    const resize = (event: MouseEvent) => {
        if(!resizing) return;

        let dx = event.clientX - resizeInitialMouseX;
        if(resizingPosition === "left") {
            dx = resizeInitialMouseX - event.clientX;
        }

        const newWidth = Math.max(resizeInitialWidth + dx, 150);
        const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

        if(newWidth < parentWidth) {
            updateAttributes({width: newWidth});
        }
    }

    const endResize = () => {
        setResizing(false);
        setResizeInitialMouseX(0);
        setResizeInitialWidth(0);
    }

    const handleTouchStart = (event: React.TouchEvent, position: "left" | "right") => {
        event.preventDefault();
        setResizing(true);
        setResizingPosition(position);
        setResizeInitialMouseX(event.touches[0]?.clientX ?? 0);
        if(imageRef.current) {
            setResizeInitialWidth(imageRef.current.offsetWidth);
        }
    }

    const handleTouchMove = (event: TouchEvent) => {
        if(!resizing) return;

        let dx = (event.touches[0]?.clientX ?? resizeInitialMouseX) - resizeInitialMouseX;
        if(resizingPosition === "left") {
            dx = resizeInitialMouseX - (event.touches[0]?.clientX ?? resizeInitialMouseX);
        }

        const newWidth = Math.max(resizeInitialWidth + dx, 150);
        const parentWidth = nodeRef.current?.parentElement?.offsetWidth ?? 0;

        if(newWidth < parentWidth) {
            updateAttributes({width: newWidth});
        }
    }

    const handleTouchEnd =() => {
        setResizing(false);
        setResizeInitialMouseX(0);
        setResizeInitialWidth(0);
    }

    useEffect(() => {
        window.addEventListener("mousemove", resize);
        window.addEventListener("mouseup", endResize);
        window.addEventListener("touchmove", handleTouchMove);
        window.addEventListener("touchend", handleTouchEnd);

        return () => {
            window.removeEventListener("mousemove", resize);
            window.removeEventListener("mouseup", endResize);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [resizing, resizeInitialMouseX, resizeInitialWidth]);

    return(
        <NodeViewWrapper
            ref={nodeRef}
            className={cn(
                "relative flex flex-col rounded-md border-2 border-transparent",
                selected ? "border-muted-foreground" : "",
                node.attrs.align === "left" && "left-0 -translate-x-0",
                node.attrs.align === "center" && "left-1/2 -translate-x-1/2",
                node.attrs.align === "right" && "left-full -translate-x-full"
            )}
            style={{width: node.attrs.width}}
        >
            <div className={cn("group relative flex flex-col rounded-md", resizing && "")}>
                <figure className="relative m-0">
                    <img
                        ref={imageRef}
                        src={node.attrs.src}
                        alt={node.attrs.alt}
                        title={node.attrs.title}
                        className="rounded-lg duration-200 hover:shadow-lg"
                        onLoad={(e) => {
                            const img = e.currentTarget;
                            const aspectRatio = img.naturalWidth / img.naturalHeight;
                            updateAttributes({aspectRatio});
                        }}
                    />
                    {editor?.isEditable && (
                        <>
                            <div
                                className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-start p-2"
                                style={{left: 0}}
                                onMouseDown={(event) => {handleResizingPosition({e: event, position: "left"})}}
                                onTouchStart={(event) => handleTouchStart(event, "left")}
                            >
                                <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 group-hover:opacity-100"/>
                            </div>
                            <div
                                className="absolute inset-y-0 z-20 flex w-[25px] cursor-col-resize items-center justify-end p-2"
                                style={{right: 0}}
                                onMouseDown={(event) => {handleResizingPosition({e: event, position: "right"})}}
                                onTouchStart={(event) => handleTouchStart(event, "right")}
                            >
                                <div className="z-20 h-[70px] w-1 rounded-xl border bg-[rgba(0,0,0,0.65)] opacity-0 group-hover:opacity-100"/>
                            </div>
                        </>
                    )}
                </figure>
                {editor?.isEditable && (
                    <div
                        className={cn(
                            "absolute right-4 top-4 flex items-center gap-1 rounded-md border bg-background/80 p-1 opacity-0 backdrop-blur",
                            !resizing && "group-hover:opacity-100",
                            openedMore && "opacity-100"
                        )}
                    >
                    <Button
                        size="icon"
                        className={cn("size-7", node.attrs.align === "left" && "bg-accent")}
                        variant="ghost"
                        onClick={() => updateAttributes({align: "left"})}
                        type="button"
                    >
                        <AlignLeft className="size-4"/>
                    </Button>
                    <Button
                        size="icon"
                        className={cn("size-7", node.attrs.align === "center" && "bg-accent")}
                        variant="ghost"
                        onClick={() => updateAttributes({align: "center"})}
                        type="button"
                    >
                    <AlignCenter className="size-4"/>
                    </Button>
                    <Button
                        size="icon"
                        className={cn("size-7", node.attrs.align === "right" && "bg-accent")}
                        variant="ghost"
                        onClick={() => updateAttributes({align: "right"})}
                        type="button"
                    >
                    <AlignRight className="size-4" />
                    </Button>
                </div>
                )}
            </div>
        </NodeViewWrapper>
    );
}