import type {
    Account,
    Emoji,
    Instance,
    RolePermission,
    Token,
} from "@lysand-org/client/types";

export interface Identity {
    id: string;
    tokens: Token;
    account: Account;
    instance: Instance;
    permissions: RolePermission[];
    emojis: Emoji[];
}
