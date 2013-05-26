<?php

namespace App\Document;

use Doctrine\ODM\MongoDB\Mapping\Annotations as MongoDB;

/**
 * @MongoDB\MappedSuperclass
 */
abstract class AbstractContent
{
    /**
     * @MongoDB\Id
     */
    protected $id;

    /**
     * @MongoDB\ReferenceOne(targetDocument="AbstractDocument")
     */
    protected $parent;

    /**
     * @MongoDB\String
     */
    protected $title;

    /**
     * @MongoDB\Boolean
     */
    public $piblished = false;

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function __construct(AbstractContent $parent = null)
    {
        $this->id = new \MongoId();
        if (!empty($parent)) {
            $this->parent = $parent;
        }
    }

    /**
     * 
     * @return \App\Document\AbstractContent
     */
    public function getParent()
    {
        return $this->parent;
    }

    /**
     * 
     * @param \App\Document\AbstractContent $parent
     */
    public function setParent(AbstractContent $parent)
    {
        $this->parent = $parent;
    }

    public function getTitle()
    {
        return $this->title;
    }

    public function setTitle($title)
    {
        $this->title = $title;
    }
    
    public function isPiblished()
    {
        return $this->piblished;
    }

    public function piblish()
    {
        $this->piblished = true;
    }
}
