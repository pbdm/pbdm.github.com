<?php
/**
 * 2013-12-10
 * 按照单词反转字符串
 * 再弄个php空格位置不变的版本吧，不使用php自带反转函数`strrev()`, 在原来的基础上增加一个数组存放空格的位置
 * 原始字符串
 * $arr = "apple    orange banana   pear lemon peach mango";
 * 需要得到的字符串
 * $arr = "mango    peach lemon   pear banana orange apple";
*/

$arr = "apple    orange banana   pear lemon peach mango";
var_dump($arr);
class reverse{

    public function __construct($arr){
        $this -> rev = $this->reverse($arr);
    }

    private function reverse($arr){
        $r = $this -> arrrevs($arr);
        $arr = $r[0];
        $r[1] = $this -> arrrev($r[1]);

        $arr = $this -> wordrev($arr,$r[1]);
        return $arr;
    }

    /**
     * 将字符串反转 , 并取得空格数目数组
     */
    private function arrrevs($arr){
        $len = strlen($arr);
        $newarr = '';
        $arrblank = '';
        $num_blank = 0;
        $last_str = true;
        for($i = $len-1 ; $i >= 0 ; $i--) {
            $newarr .= $arr[$i];
            if ($arr[$i] ==' ') {
                $last_str = false;
                $num_blank ++;
            } else {
                if (!$last_str) { //last str is blank
                    $arrblank .= $num_blank;
                    $num_blank = 0;
                }
                $last_str = true;
            }
        }

        $r = array($newarr,$arrblank);
        return $r;
    }

    /**
     * 将字符串反转
     */
    private function arrrev($arr){
        $len = strlen($arr);
        $newarr = '';
        for($i = $len-1 ; $i >= 0 ; $i--) {
            $newarr .= $arr[$i];
        }
        return $newarr;
    }

    /**
     * 将字符串里的每个单词反转
     */
    private function wordrev($arr,$arrblank){
        $len = strlen($arr);
        $newarr = '';
        $word = '';
        $last_str = true;
        $j = 0;
        for($i = 0 ; $i < $len ; $i++) {
            if ($arr[$i] != ' ') {
                if (!$last_str) {//last str is blank
                    $newarr .= $this -> getblank($arrblank,$j);
                    $j ++;
                }
                $word .= $arr[$i];
                $last_str = true;
            } else {
                if ($last_str) {
                    $word = $this -> arrrev($word);
                    $newarr .= $word;
                    $word = '';
                }
                $last_str = false;
            }
            if($i == $len-1) { //for the last word
                $word = $this -> arrrev($word);
                $newarr .= $word;
            }
        }
        return $newarr;
    }

    private function getblank($arrblank,$num){
        $len = $arrblank[$num];
        $r = '';
        for($i = 0; $i < $len ; $i++) {
            $r .= ' ';
        }
        return $r;
    }
}

$obj = new reverse($arr);
$res = $obj -> rev;
var_dump($res);
