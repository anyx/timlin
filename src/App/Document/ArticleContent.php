<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\EmbeddedDocument
 */
class ArticleContent extends AbstractContent
{
    /**
     * @MongoDB\String
     */
    protected $text;

    /**
     * @MongoDB\Hash
     */
    protected $content;

    /**
     * @return \MongoId
     */
    public function getId()
    {
        return $this->id;
    }

    public function getContent()
    {
        return $this->content;
    }

    public function copyContent(AbstractContent $parent)
    {
        $this->setContent($parent->getContent());
    }

    public function setText($text)
    {
        $this->text = $text;
    }

    public function getText()
    {
        return $this->text;
    }

    public function setContent($content)
    {
        $this->content = $content;
        if (is_array($content) && array_key_exists('value', $content)) {
            $this->setText($content['value']);
        }
    }
}
