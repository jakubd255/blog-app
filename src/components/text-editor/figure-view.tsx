"use client";

import { NodeViewWrapper, NodeViewContent, type NodeViewProps } from "@tiptap/react";
import { AlignLeft, AlignCenter, AlignRight, Captions } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";

export default function FigureView({node, updateAttributes, selected, editor}: NodeViewProps) {
    const figureRef = useRef<HTMLDivElement | null>(null);
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
        if(figureRef.current) {
            setResizeInitialWidth(figureRef.current.offsetWidth);
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
        if(figureRef.current) {
            setResizeInitialWidth(figureRef.current.offsetWidth);
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
                "relative mx-auto",
                node.attrs.align === "left" && "ml-0 mr-auto",
                node.attrs.align === "right" && "ml-auto mr-0",
                selected && "ring-1 ring-muted-foreground"
            )}
            style={{width: node.attrs.width}}
        >
            <figure className="group relative" ref={figureRef}>
                <NodeViewContent/>
                {editor.isEditable && (
                    <figcaption
                        contentEditable
                        suppressContentEditableWarning
                        onInput={(e) => updateAttributes({caption: e.currentTarget.textContent})}
                    >
                        {node.attrs.caption || ""}
                    </figcaption>
                )}
                {editor.isEditable && (
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
                {editor.isEditable && (
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
                        <Separator orientation="vertical"/>
                    </div>
                )}
            </figure>
        </NodeViewWrapper>
    );
}