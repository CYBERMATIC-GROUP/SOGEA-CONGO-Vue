export interface Caisse {
    IDCAISSE: number;
    CodeCaisse: string;
    LibelleCaisse: string;
    CompteAssocie: string;
    RetraitMaxOperation: number;
    RetraitMaxParPeriode: number;
    PeriodeRetraitMax: number;
    VersementsAutorises: boolean;
    RetraitsAutorises: boolean;
    TransfertsIntercaissesAutorises: boolean;
    TransfertsRetraitsBanquesAutorises: boolean;
    Solde: number;
    IDCOMPTE: number;
}
