import {expect} from 'chai';
import {List} from 'immutable';
import createModel from './createModel';

describe('create model helper', () => {
    const createSimpleClass = () => createModel('Class', () => ({}));
    it('creates a constructor', () => {
        const Class = createSimpleClass();
        expect(new Class()).to.be.an.instanceOf(Class);
    });
    it('defines fromServer static method', () => {
        const Class = createSimpleClass();
        expect(Class.fromServer).to.be.a('function');
    });
    it('defines fromServerList static method', () => {
        const Class = createSimpleClass();
        expect(Class.fromServerList).to.be.a('function');
    });
    it('writes toString with specified name', () => {
        const name = 'VerySimpleClass';
        const Class = createModel(name, () => ({}));
        expect(new Class().toString()).to.match(new RegExp(`^${name}`));
    });
    const Soldier = createModel('Soldier', (json) => ({
        name: json.name,
        nickname: json.nickname,
        rank: json.rank,
        designation: json.designation,
    }));
    const Squad = createModel('Squad', (json) => ({
        number: json.number,
        company: json.company,
        leader: Soldier.fromServer(json.leader),
        members: Soldier.fromServerList(json.members),
    }));
    const theNinth = {
        number: 9,
        company: 'The Bridgeburners',
        leader: {
            name: 'Iskar Jarak',
            nickname: 'Whiskeyjack',
            rank: 'sergeant',
        },
        members: [
            {name: 'Kalam Mekhar', rank: 'corporal'},
            {nickname: 'Fiddler', designation: 'sapper'},
            {nickname: 'Hedge', designation: 'sapper'},
            {nickname: 'Mallet', designation: 'healer'},
            {nickname: 'Quick Ben', name: 'Ben Adaephon Delat', designation: 'squad mage'},
            {nickname: 'Trotts'},
            {nickname: 'Sorry'},
        ],
    };
    const members = [
        {name: 'Kalam Mekhar', nickname: undefined, rank: 'corporal', designation: undefined},
        {name: undefined, nickname: 'Fiddler', rank: undefined, designation: 'sapper'},
        {name: undefined, nickname: 'Hedge', rank: undefined, designation: 'sapper'},
        {name: undefined, nickname: 'Mallet', rank: undefined, designation: 'healer'},
        {name: 'Ben Adaephon Delat', nickname: 'Quick Ben', rank: undefined, designation: 'squad mage'},
        {name: undefined, nickname: 'Trotts', rank: undefined, designation: undefined},
        {name: undefined, nickname: 'Sorry', rank: undefined, designation: undefined},
    ];
    describe('fromServer', () => {
        it('creates instances of parent class', () => {
            expect(Squad.fromServer()).to.be.an.instanceOf(Squad);
        });
        it('returns default object for empty input', () => {
            expect(Squad.fromServer().toJS()).to.deep.equal({
                number: undefined,
                company: undefined,
                leader: {
                    name: undefined,
                    nickname: undefined,
                    rank: undefined,
                    designation: undefined,
                },
                members: [],
            });
        });
        it('applies transformation on complicated object', () => {
            expect(Squad.fromServer(theNinth).toJS()).to.deep.equal({
                number: 9,
                company: 'The Bridgeburners',
                leader: {
                    name: 'Iskar Jarak',
                    nickname: 'Whiskeyjack',
                    rank: 'sergeant',
                    designation: undefined,
                },
                members,
            });
        });
    });
    describe('fromServerList', () => {
        it('returns empty list for empty input', () => {
            expect(Soldier.fromServerList()).to.equal(List());
        });
        it('applies fromServer on each item in the list', () => {
            expect(Soldier.fromServerList(theNinth.members).toJS()).to.deep.equal(members);
        });
    });
});
