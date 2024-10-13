export type NodeType = | "Program" | "NumericLiteral" | "Identifier" | "BinaryExpr";

export interface Stmt {
    kind : NodeType
}

export interface Program extends Stmt{
    kind : "Program";
    body : Stmt[];
}

export interface Expression extends Stmt {}

export interface BinaryExpression extends Expression {
    left : Expression;
    right : Expression;
    operator : string
}