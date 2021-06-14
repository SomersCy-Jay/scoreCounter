from os import stat_result
from .Database import Database


class DataRepository:
    @staticmethod
    def json_or_formdata(request):
        if request.content_type == 'application/json':
            gegevens = request.get_json()
        else:
            gegevens = request.form.to_dict()
        return gegevens

    @staticmethod
    def read_spelers():
        sql = "SELECT * FROM speler"
        return Database.get_rows(sql)

    @staticmethod
    def create_match(speler1, speler2):
        sql = "INSERT into wedstrijd (speler1, speler2, datum) VALUES (%s, %s, curdate())"
        params = [speler1, speler2]
        return Database.execute_sql(sql, params)

    @staticmethod
    def read_match_score():
        sql = "select (select speler.naam from speler where speler.id = wedstrijd.speler1) as `speler1`, (select speler.naam from speler where speler.id = wedstrijd.speler2) as `speler2`, wedstrijd.idwedstrijd, datum, max(scoreSpeler1) as `scoreSpeler1`, max(scoreSpeler2) as `scoreSpeler2` from speler"
        sql += " join wedstrijd on speler.id = wedstrijd.speler1"
        sql += " join wedstrijdverloop on wedstrijd.idwedstrijd = wedstrijdverloop.idWedstrijd"
        sql += " group by wedstrijd.idwedstrijd; "
        return Database.get_rows(sql)

    @staticmethod
    def create_matchverloop(spelerID, scoreSpeler1, scoreSpeler2, snelheid):
        sql = "insert into wedstrijdverloop (idWedstrijd, spelerID, scoreSpeler1, scoreSpeler2, tijdstip, snelheid)"
        sql += " values ((select max(idwedstrijd) from wedstrijd), %s, %s, %s, current_time(), %s)"
        params = [spelerID, scoreSpeler1, scoreSpeler2, snelheid]
        return Database.execute_sql(sql, params)

    @staticmethod
    def get_speler2():
        sql = "SELECT speler2 FROM voetbaltafel.wedstrijd order by idwedstrijd desc limit 1;"
        return Database.get_one_row(sql)

    @staticmethod
    def get_speler1():
        sql = "SELECT speler1 FROM voetbaltafel.wedstrijd order by idwedstrijd desc limit 1;"
        return Database.get_one_row(sql)

    @staticmethod
    def get_historiek(idwedstrijd):
        sql = "select wv.idWedstrijd, wv.spelerID, s.naam, wv.scoreSpeler1, wv.scoreSpeler2, wv.snelheid from wedstrijdverloop wv join speler s on s.id = wv.spelerID where idwedstrijd = %s"
        params = [idwedstrijd]
        return Database.get_rows(sql, params)

    @staticmethod
    def create_speler(naam):
        sql = "INSERT INTO speler (naam) values (%s)"
        params = [naam]
        return Database.execute_sql(sql, params)

    @staticmethod
    def delete_match(idwedstrijd):
        sql = "DELETE FROM wedstrijd where idwedstrijd = %s"
        params = [idwedstrijd]
        return Database.execute_sql(sql, params)

    @staticmethod
    def delete_speler(ID):
        sql = "DELETE FROM speler where id = %s"
        params = [ID]
        return Database.execute_sql(sql, params)

    @staticmethod
    def get_namen_voor_his(idwedstrijd):
        sql = "select (select speler.naam from speler where speler.id = wedstrijd.speler1) as `speler1`, (select speler.naam from speler where speler.id = wedstrijd.speler2) as `speler2`, wedstrijd.idwedstrijd from speler"
        sql += " join wedstrijd on speler.id = wedstrijd.speler1"
        sql += " group by wedstrijd.idwedstrijd having wedstrijd.idwedstrijd = %s;"
        params = [idwedstrijd]
        return Database.get_one_row(sql, params)

    @staticmethod
    def get_scores_match():
        sql = "SELECT scoreSpeler1, scoreSpeler2, snelheid FROM wedstrijdverloop order by idwedstrijdVerloop desc limit 1;"
        return Database.get_one_row(sql)

    @staticmethod
    def get_head_2_head(speler1, speler2):
        sql = "SELECT speler1, speler2, (select speler.naam from speler where speler.id = w.speler1) as `naam1`, (select speler.naam from speler where speler.id = w.speler2) as `naam2`, max(wv.scoreSpeler1) as `scoreSpeler1`, max(wv.scoreSpeler2) as `scoreSpeler2` FROM wedstrijdverloop wv"
        sql += " join wedstrijd w on wv.idwedstrijd = w.idwedstrijd"
        sql += " where speler1 = %s and speler2 = %s or speler2 = %s and speler1= %s"
        sql += " group by w.idwedstrijd;"
        params = [speler1, speler2, speler1, speler2]
        return Database.get_rows(sql, params)
