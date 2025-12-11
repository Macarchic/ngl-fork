/**
 * @file Contact
 * @author Alexander Rose <alexander.rose@weirdbyte.de>
 */
import { TextBufferData } from '../../buffer/text-buffer';
import Structure from '../../structure/structure';
import AtomProxy from '../../proxy/atom-proxy';
import SpatialHash from '../../geometry/spatial-hash';
import ContactStore from '../../store/contact-store';
import BitArray from '../../utils/bitarray';
import { ContactPicker } from '../../utils/picker';
import { AdjacencyList } from '../../utils/adjacency-list';
import { Features } from './features';
export interface Contacts {
    features: Features;
    spatialHash: SpatialHash;
    contactStore: ContactStore;
    featureSet: BitArray;
}
export interface FrozenContacts extends Contacts {
    contactSet: BitArray;
    adjacencyList: AdjacencyList;
}
export declare const enum ContactType {
    Unknown = 0,
    IonicInteraction = 1,
    CationPi = 2,
    PiStacking = 3,
    HydrogenBond = 4,
    HalogenBond = 5,
    Hydrophobic = 6,
    MetalCoordination = 7,
    WeakHydrogenBond = 8,
    WaterHydrogenBond = 9,
    BackboneHydrogenBond = 10
}
export declare const ContactDefaultParams: {
    maxHydrophobicDist: number;
    maxHbondDist: number;
    maxHbondSulfurDist: number;
    maxHbondAccAngle: number;
    maxHbondDonAngle: number;
    maxHbondAccPlaneAngle: number;
    maxHbondDonPlaneAngle: number;
    maxPiStackingDist: number;
    maxPiStackingOffset: number;
    maxPiStackingAngle: number;
    maxCationPiDist: number;
    maxCationPiOffset: number;
    maxIonicDist: number;
    maxHalogenBondDist: number;
    maxHalogenBondAngle: number;
    maxMetalDist: number;
    refineSaltBridges: boolean;
    masterModelIndex: number;
    lineOfSightDistFactor: number;
};
export declare function isMasterContact(ap1: AtomProxy, ap2: AtomProxy, masterIdx: number): boolean;
export declare function invalidAtomContact(ap1: AtomProxy, ap2: AtomProxy, masterIdx: number): boolean | "";
export declare function createContacts(features: Features): Contacts;
export declare function createFrozenContacts(contacts: Contacts): FrozenContacts;
export declare function calculateContacts(structure: Structure, params?: {
    maxHydrophobicDist: number;
    maxHbondDist: number;
    maxHbondSulfurDist: number;
    maxHbondAccAngle: number;
    maxHbondDonAngle: number;
    maxHbondAccPlaneAngle: number;
    maxHbondDonPlaneAngle: number;
    maxPiStackingDist: number;
    maxPiStackingOffset: number;
    maxPiStackingAngle: number;
    maxCationPiDist: number;
    maxCationPiOffset: number;
    maxIonicDist: number;
    maxHalogenBondDist: number;
    maxHalogenBondAngle: number;
    maxMetalDist: number;
    refineSaltBridges: boolean;
    masterModelIndex: number;
    lineOfSightDistFactor: number;
}): FrozenContacts;
/**
 * Lightweight early-exit checker.
 * Runs only the requested contact types and returns true
 * immediately when at least one allowed contact is found.
 */
export declare function findContactsOR(structure: Structure, params: {
    maxHydrophobicDist: number;
    maxHbondDist: number;
    maxHbondSulfurDist: number;
    maxHbondAccAngle: number;
    maxHbondDonAngle: number;
    maxHbondAccPlaneAngle: number;
    maxHbondDonPlaneAngle: number;
    maxPiStackingDist: number;
    maxPiStackingOffset: number;
    maxPiStackingAngle: number;
    maxCationPiDist: number;
    maxCationPiOffset: number;
    maxIonicDist: number;
    maxHalogenBondDist: number;
    maxHalogenBondAngle: number;
    maxMetalDist: number;
    refineSaltBridges: boolean;
    masterModelIndex: number;
    lineOfSightDistFactor: number;
} | undefined, allowedTypes: ContactType[], checkParams?: ContactDataParams): boolean;
/**
 * Early-exit AND checker.
 * Returns false as soon as any requested contact type is absent,
 * otherwise true if all requested types have at least one match.
 */
export declare function findContactsAND(structure: Structure, params: {
    maxHydrophobicDist: number;
    maxHbondDist: number;
    maxHbondSulfurDist: number;
    maxHbondAccAngle: number;
    maxHbondDonAngle: number;
    maxHbondAccPlaneAngle: number;
    maxHbondDonPlaneAngle: number;
    maxPiStackingDist: number;
    maxPiStackingOffset: number;
    maxPiStackingAngle: number;
    maxCationPiDist: number;
    maxCationPiOffset: number;
    maxIonicDist: number;
    maxHalogenBondDist: number;
    maxHalogenBondAngle: number;
    maxMetalDist: number;
    refineSaltBridges: boolean;
    masterModelIndex: number;
    lineOfSightDistFactor: number;
} | undefined, requiredTypes: ContactType[], checkParams?: ContactDataParams): boolean;
/**
 * OPTIMIZED: Calculate contacts with early exit - stops at first found
 * Much faster when you only need to know IF contacts exist
 */
export declare function calculateContactsWithEarlyExit(structure: Structure, params: {
    maxHydrophobicDist: number;
    maxHbondDist: number;
    maxHbondSulfurDist: number;
    maxHbondAccAngle: number;
    maxHbondDonAngle: number;
    maxHbondAccPlaneAngle: number;
    maxHbondDonPlaneAngle: number;
    maxPiStackingDist: number;
    maxPiStackingOffset: number;
    maxPiStackingAngle: number;
    maxCationPiDist: number;
    maxCationPiOffset: number;
    maxIonicDist: number;
    maxHalogenBondDist: number;
    maxHalogenBondAngle: number;
    maxMetalDist: number;
    refineSaltBridges: boolean;
    masterModelIndex: number;
    lineOfSightDistFactor: number;
} | undefined, checkParams: ContactDataParams): boolean;
export declare function contactTypeName(type: ContactType): "hydrogen bond" | "hydrophobic contact" | "halogen bond" | "ionic interaction" | "metal coordination" | "cation-pi interaction" | "pi-pi stacking" | "weak hydrogen bond" | "unknown contact";
export declare const ContactDataDefaultParams: {
    hydrogenBond: boolean;
    hydrophobic: boolean;
    halogenBond: boolean;
    ionicInteraction: boolean;
    metalCoordination: boolean;
    cationPi: boolean;
    piStacking: boolean;
    weakHydrogenBond: boolean;
    waterHydrogenBond: boolean;
    backboneHydrogenBond: boolean;
    radius: number;
    filterSele: string;
    colors: Partial<{
        hydrogenBond: string;
        weakHydrogenBond: string;
        waterHydrogenBond: string;
        backboneHydrogenBond: string;
        hydrophobic: string;
        halogenBond: string;
        ionicInteraction: string;
        metalCoordination: string;
        cationPi: string;
        piStacking: string;
        default: string;
    }>;
};
export declare type ContactDataParams = typeof ContactDataDefaultParams | ({
    filterSele: string | [string, string];
} & {
    colors?: ContactColorOverrides;
});
export declare const ContactLabelDefaultParams: {
    unit: string;
    size: number;
};
export declare type ContactLabelParams = typeof ContactLabelDefaultParams;
export declare type ContactColorOverrides = Partial<{
    hydrogenBond: string;
    weakHydrogenBond: string;
    waterHydrogenBond: string;
    backboneHydrogenBond: string;
    hydrophobic: string;
    halogenBond: string;
    ionicInteraction: string;
    metalCoordination: string;
    cationPi: string;
    piStacking: string;
    default: string;
}>;
export interface ContactData {
    position1: Float32Array;
    position2: Float32Array;
    color: Float32Array;
    color2: Float32Array;
    radius: Float32Array;
    picking: ContactPicker;
}
export declare function getContactData(contacts: FrozenContacts, structure: Structure, params: ContactDataParams): ContactData;
/**
 * OPTIMIZED: Check if ANY contact exists (stops at first found)
 * Much faster than getContactData when you only need boolean result
 *
 * @param contacts - calculated contacts
 * @param structure - molecular structure
 * @param params - same params as getContactData
 * @returns true if at least one contact found, false otherwise
 */
export declare function hasAnyContact(contacts: FrozenContacts, structure: Structure, params: ContactDataParams): boolean;
export declare function getLabelData(contactData: ContactData, params: ContactLabelParams): TextBufferData;
