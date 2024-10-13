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
    kind : "BinaryExpr";
    left : Expression;
    right : Expression;
    operator : string
}

export interface Identifier extends Expression {
    kind : "Identifier";
    symbol : string
}

export interface NumericLiteral extends Expression {
    kind : "NumericLiteral";
    symbol : number
}