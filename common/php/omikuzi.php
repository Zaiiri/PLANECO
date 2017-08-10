<?php
/*
 * jQuery CHAT v.1.00 @おみくじ機能
 * 
 * Copyright(C)2014 STUDIO KEY Allright reserved.
 * http://studio-key.com
 * MIT License
 * 
 * 適当に幾つかおみくじ結果を書いていますので、変更して下さい。
 * また、自由に追加する事も可能です。
 * 追加する場合はカンマに注意して下さい。
 * 
 * $array = array(
 *  '結果A'
 * ,'結果B'
 * ,'結果C'
 * );
 * 結果C部分をコピーし、追加していくと良いと思います。
 * 乱数は偏りが有りますので、同じ結果が出る場合も有ります
 * 
 */
class Omikuzu{
  
/*
 * 普通のおみくじ
 * [おみくじ]で発動
 */
  public function Nomal(){
    $array = array(
        '[大吉] ヽ(=´▽`=)ﾉ今日は1日笑顔で楽しく過ごせるかも!'
       ,'[中吉] まぁまぁかなぁ'
       ,'[中吉] うむむ なかなか良いね'
       ,'[中吉] (￣ー￣)ｂｸﾞｯ!'
       ,'[中吉] ( ´∀｀)bｸﾞｯ!'
       ,'[小吉] ぼちぼち'
       ,'[小吉] ( ΦωΦ)ｂ'
       ,'[小吉] (｡-ω-)ｂ'
       ,'[凶] （゜Д゜）!?'
       ,'[大凶] (´・ω・`)'
    );
    
    $cnt = count($array) - 1;
    $rnd = mt_rand(0, $cnt );
    return $array[$rnd];
  }
/*
 * 健康運
 *[けんこう]で発動
 */
  public function Kenko(){
    $array = array(
        '腹痛注意！食べ過ぎに気をつけて！'
       ,'転ぶかも？怪我に気をつけて！'
       ,'頭痛・・空気の良いとこに行こう！'
       ,'1日健康だね！'
       ,'腰痛大丈夫？背伸びして！'
       ,'肩こりって辛いよねぇ・・'
       ,'今日は健やかに過ごせると思うよ！'
       ,'風邪に気をつけて！外に出るときはマスクだよ！'
       ,'可もなく不可もなく・・'
    );
    
    $cnt = count($array) - 1;
    $rnd = mt_rand(0, $cnt );
    return $array[$rnd];
  }
/*
 * 恋愛運
 * [れんあい]で発動
 */
  public function Renai(){
    $array = array(
        '良い出会いがあるかもヽ(=´▽`=)ﾉ 外に出てみよう！'
       ,'(´・ω・`)これは・・・浮気注意だね・・'
       ,'(*^_^*)手を繋いでみよう！'
       ,'(´～｀)ﾓｸﾞﾓｸﾞ たまには美味しいごはんを食べに連れてってみよう！'
       ,'( ﾟдﾟ)デート・・不吉な予感が・・'
       ,'最高の恋愛運！　といつ勘違いしてた？'
       ,'( ｰ`дｰ´)ｷﾘｯ　先ずは優しさから！'
       ,'(｡-ω-)あのキャバ嬢はやめておきな・・'
       ,'優しい声をかけてみて♡'
       ,'頭をなでてあげてみて♡'
       ,'ぎゅっと抱きしめてあげてみて♡'
       ,'（゜Д゜）!?'
       ,'「・・」何も言えない・・'
       ,'いやまぁ・・頑張って・・・'
    );
    
    $cnt = count($array) - 1;
    $rnd = mt_rand(0, $cnt );
    return $array[$rnd];
  }
  
}
